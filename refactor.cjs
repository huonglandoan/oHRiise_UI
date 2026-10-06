const fs = require('fs');
const path = require('path');

const SRC_DIR = path.join(__dirname, 'src');

const moves = [
  // Types
  { old: 'src/types.ts', new: 'src/types/index.ts' },
  
  // Styles
  { old: 'src/index.css', new: 'src/styles/index.css' },
  { old: 'src/domain.css', new: 'src/styles/domain.css' },
  { old: 'src/employee-domain.css', new: 'src/styles/employee-domain.css' },
  
  // Dashboards & Pages at root
  { old: 'src/EmployeeDashboard.tsx', new: 'src/pages/EmployeeDashboard.tsx' },
  { old: 'src/HrDashboard.tsx', new: 'src/pages/HrDashboard.tsx' },
  { old: 'src/LeadDashboard.tsx', new: 'src/pages/LeadDashboard.tsx' },
  { old: 'src/AdminPage.tsx', new: 'src/pages/AdminPage.tsx' },
  { old: 'src/PolicyPage.tsx', new: 'src/pages/PolicyPage.tsx' },
  
  // Global Components
  { old: 'src/AiAssistantDrawer.tsx', new: 'src/components/AiAssistantDrawer.tsx' },
];

// Add src/admin to src/features/admin
const adminFiles = []
adminFiles.forEach(file => {
  const fullPath = path.join(SRC_DIR, 'admin', file);
  if (fs.statSync(fullPath).isFile()) {
    moves.push({
      old: `src/admin/${file}`,
      new: `src/features/admin/${file}`
    });
  }
});

// We keep everything else in src/pages and src/components as they are for now,
// unless they need to be moved. 
// Let's create the directories.
const dirs = ['src/types', 'src/styles', 'src/features/admin', 'src/components'];
dirs.forEach(dir => {
  fs.mkdirSync(path.join(__dirname, dir), { recursive: true });
});

// Helper to get all files
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
const movedMap = {}; // old absolute path -> new absolute path
moves.forEach(m => {
  movedMap[path.join(__dirname, m.old)] = path.join(__dirname, m.new);
});

// We need a function to compute relative imports
function computeRelativeImport(fromFile, toFile) {
  const fromDir = path.dirname(fromFile);
  let rel = path.relative(fromDir, toFile);
  if (!rel.startsWith('.')) {
    rel = './' + rel;
  }
  // Remove extension for TS/TSX
  if (rel.endsWith('.tsx')) rel = rel.slice(0, -4);
  else if (rel.endsWith('.ts')) rel = rel.slice(0, -3);
  // Remove /index if it's the index file
  if (rel.endsWith('/index')) rel = rel.slice(0, -6);
  if (rel === './index') rel = '.';
  return rel;
}

// 1. Process imports in all files in memory
const newContents = {};

allFiles.forEach(filePath => {
  if (!filePath.endsWith('.tsx') && !filePath.endsWith('.ts') && !filePath.endsWith('.css')) return;
  
  let content = fs.readFileSync(filePath, 'utf-8');
  const fileNewPath = movedMap[filePath] || filePath;
  const oldDir = path.dirname(filePath);

  // Match import statements: import ... from "..." or import "..."
  // Also match lazy(() => import("..."))
  const importRegex = /(import\s+(?:[^"']+from\s+)?|import\()(['"])([^'"]+)\2(\))?/g;
  
  content = content.replace(importRegex, (match, prefix, quote, importPath, suffix) => {
    if (!importPath.startsWith('.')) return match; // skip absolute/node_modules

    // Resolve old import path
    let resolvedImportPath = path.resolve(oldDir, importPath);
    
    // It might lack extension. Check if resolvedImportPath + .ts or .tsx or .css exists in old structure
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
      
      // Keep .css extension if it was there
      if (foundOldAbsPath.endsWith('.css')) {
        newRelative += '.css';
      }
      
      // Ensure we don't accidentally append .css if it already has it
      if (newRelative.endsWith('.css.css')) newRelative = newRelative.slice(0, -4);

      return `${prefix}${quote}${newRelative}${quote}${suffix || ''}`;
    }

    return match;
  });

  newContents[filePath] = { content, newPath: fileNewPath };
});

// 2. Write to new locations and delete old ones
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

// Remove old admin directory if empty
try {
  fs.rmSync(path.join(SRC_DIR, 'admin'), { recursive: true, force: true });
} catch(e) {}

console.log("Refactoring complete!");
