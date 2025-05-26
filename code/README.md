# PlanFlow

This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 19.2.13.

## Steps for running the project

- Install dependencies

```bash
npm install
```

- Run development server

```bash
ng serve
```

## Testing

```bash
ng test
```

## Implementation notes

- Used a service for managing application state, as it's very simple
- Used ngx-toastr for displaying notifications
- Used ngx-markdown for displaying markdown content
- Modals can be closed by pressing Escape
- Created component for displaying loading state
- Used `localStorage` for saving user data and Trello token
- Implemented unit and integration tests for components `FormCard` and `FormBoard`
