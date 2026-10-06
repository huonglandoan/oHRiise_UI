const fs = require('fs');
const path = require('path');

const SRC_DIR = path.join(__dirname, 'src');

const moves = [
  { old: 'src/pages/DashboardPage.tsx', new: 'src/features/dashboard/DashboardRouter.tsx' },
  { old: 'src/pages/EmployeeDashboard.tsx', new: 'src/features/dashboard/roles/EmployeeDashboard.tsx' },
  { old: 'src/pages/HrDashboard.tsx', new: 'src/features/dashboard/roles/HrDashboard.tsx' },
  { old: 'src/pages/LeadDashboard.tsx', new: 'src/features/dashboard/roles/LeadDashboard.tsx' },
];

fs.mkdirSync(path.join(SRC_DIR, 'features/dashboard/roles'), { recursive: true });
fs.mkdirSync(path.join(SRC_DIR, 'features/dashboard/components'), { recursive: true });

function getAllFiles(dir, fileList = []) {
  if (!fs.existsSync(dir)) return fileList;
  const files = fs.readdirSync(dir);
  files.forEach(file => {
    const filePath = path.join(dir, file);
    if (fs.statSync(filePath).isDirectory()) {
      getAllFiles(filePath, fileList);
    } else {
      fileList.push(filePath);
    }
  });
  return fileList;
}

const allFiles = getAllFiles(SRC_DIR);
const movedMap = {}; 
moves.forEach(m => {
  movedMap[path.join(__dirname, m.old)] = path.join(__dirname, m.new);
});

function computeRelativeImport(fromFile, toFile) {
  const fromDir = path.dirname(fromFile);
  let rel = path.relative(fromDir, toFile);
  if (!rel.startsWith('.')) {
    rel = './' + rel;
  }
  if (rel.endsWith('.tsx')) rel = rel.slice(0, -4);
  else if (rel.endsWith('.ts')) rel = rel.slice(0, -3);
  if (rel.endsWith('/index')) rel = rel.slice(0, -6);
  if (rel === './index') rel = '.';
  return rel;
}

const newContents = {};

allFiles.forEach(filePath => {
  if (!filePath.endsWith('.tsx') && !filePath.endsWith('.ts') && !filePath.endsWith('.css')) return;
  
  let content = fs.readFileSync(filePath, 'utf-8');
  const fileNewPath = movedMap[filePath] || filePath;
  const oldDir = path.dirname(filePath);

  const importRegex = /(import\s+(?:[^"']+from\s+)?|import\()(['"])([^'"]+)\2(\))?/g;
  
  content = content.replace(importRegex, (match, prefix, quote, importPath, suffix) => {
    if (!importPath.startsWith('.')) return match; 

    let resolvedImportPath = path.resolve(oldDir, importPath);
    let foundOldAbsPath = null;
    const extensions = ['', '.tsx', '.ts', '.css', '/index.ts', '/index.tsx'];
    
    for (const ext of extensions) {
      const testPath = resolvedImportPath + ext;
      if (allFiles.includes(testPath)) {
        foundOldAbsPath = testPath;
        break;
      }
    }

    if (foundOldAbsPath) {
      const targetNewPath = movedMap[foundOldAbsPath] || foundOldAbsPath;
      let newRelative = computeRelativeImport(fileNewPath, targetNewPath);
      
      if (foundOldAbsPath.endsWith('.css')) {
        newRelative += '.css';
      }
      if (newRelative.endsWith('.css.css')) newRelative = newRelative.slice(0, -4);

      return `${prefix}${quote}${newRelative}${quote}${suffix || ''}`;
    }

    return match;
  });

  newContents[filePath] = { content, newPath: fileNewPath };
});

Object.keys(newContents).forEach(oldPath => {
  const { content, newPath } = newContents[oldPath];
  if (oldPath !== newPath) {
    fs.mkdirSync(path.dirname(newPath), { recursive: true });
  }
  fs.writeFileSync(newPath, content);
  
  if (oldPath !== newPath) {
    fs.unlinkSync(oldPath);
  }
});

console.log("Moved Dashboard files successfully!");
