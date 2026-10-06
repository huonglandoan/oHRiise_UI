const fs = require('fs');
let code = fs.readFileSync('src/App.tsx', 'utf8');

// Add import AppShell
code = code.replace(
  `import { Sidebar } from "./components/Layout/Sidebar";`,
  `import { Sidebar } from "./components/Layout/Sidebar";\nimport { Header } from "./components/Layout/Header";\nimport { AppShell } from "@mantine/core";`
);

// Replace layout start
const startMarker = `    <div className="app-shell">`;
const endMarker = `        <main>`;

const startIndex = code.indexOf(startMarker);
const endIndex = code.indexOf(endMarker) + endMarker.length;

if (startIndex > -1 && endIndex > -1) {
  const replacement = `    <AppShell
      header={{ height: 60 }}
      navbar={{
        width: 256,
        breakpoint: 'sm',
        collapsed: { mobile: !mobileMenu }
      }}
      bg="gray.0"
    >
      <AppShell.Header>
        <Header
          profileKey={profileKey}
          setProfileKey={handleProfileSwitch}
          profiles={DYNAMIC_PROFILES}
          onMenu={() => setMobileMenu((m) => !m)}
          onNotifications={() => setPage("notifications")}
          onLogout={() => setAuthenticated(false)}
        />
      </AppShell.Header>

      <AppShell.Navbar>
        <Sidebar
          page={page}
          setPage={handleMobileNav}
          currentProfile={currentProfile}
        />
      </AppShell.Navbar>

      <AppShell.Main>`;
  
  code = code.substring(0, startIndex) + replacement + code.substring(endIndex);
}

// Replace closing tags
const closingStartMarker = `        </main>
      </div>`;
const closingReplacement = `      </AppShell.Main>`;
code = code.replace(closingStartMarker, closingReplacement);

const lastClosingDiv = `    </div>
  );
}`;
const lastClosingReplacement = `    </AppShell>
  );
}`;
code = code.replace(lastClosingDiv, lastClosingReplacement);

fs.writeFileSync('src/App.tsx', code);
