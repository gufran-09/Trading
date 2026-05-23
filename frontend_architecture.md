# Frontend Architecture and Data Flow

## Frontend Stack

- **Framework:** React (with TypeScript)
- **State Management:** Redux Toolkit
- **Routing:** React Router
- **Styling:** CSS (with possible use of Bootstrap)
- **Testing:** React Testing Library, Jest
- **Other:** FontAwesome for icons

## Project Structure (src/main/ui/src)

- App.tsx: Main app entry point.
- components/: Reusable UI components.
- modules/: Feature modules (e.g., accounts, quotes, orders).
- reducers/, store/: Redux state management.
- common/, types/: Shared utilities and TypeScript types.

## Component & Feature Plan

### 1. Authentication
- Login Page: Handles admin login, stores JWT on success.

### 2. Dashboard Layout
- Sidebar/Navigation: For switching between Accounts, Quotes, Orders, etc.
- Main Content Area: Displays the selected feature.

### 3. Feature Modules

#### Accounts
- Fetch and display account balances.
- Component: AccountsList

#### Quotes
- Fetch and display quotes for asset classes.
- Component: QuotesTable
- Subscribe to security-quote-stream for live updates.

#### Orders
- Fetch and display orders.
- Component: OrdersTable
- Subscribe to order-stream for live updates.

#### Order Execution
- Fetch and display order executions.
- Component: OrderExecTable
- Subscribe to order-exec-stream for live updates.

#### Alerts
- Display trade alerts from trade-alert-stream.
- Component: AlertsPanel

#### Market Status
- Horizontal bar with three input boxes and "Halt" buttons.
- List of halted trades with "Resume Trading" buttons.
- Component: MarketStatusBar, MarketStatusList

## Data Flow

1. On Login: Store JWT, set up REST and websocket clients.
2. On Dashboard Load: Fetch initial data via REST, then subscribe to websocket streams for live updates.
3. On User Actions: POST/GET to backend as needed (e.g., halt/resume trading).

## Next Steps

- Scaffold pages/components for each feature.
- Implement Redux slices for state.
- Set up websocket connection after login.
- Build UI using React components and CSS/Bootstrap.
