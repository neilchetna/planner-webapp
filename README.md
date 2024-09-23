# Do-mosh

It literally stands for **Do More Sh\*t**, this app is a productivity tool made with next.js + golang.

## Installation

### Prerequisites

- Ensure you have Node.js and npm installed. You can download them from [Node.js official website](https://nodejs.org/).
- Additionally install [pnpm](https://pnpm.io/) for installing frontend
- Ensure you have Go installed. You can download it from [Go official website](https://golang.org/).
- Ensure you also have [docker-desktop](https://www.docker.com/products/docker-desktop/) to run a database instance.
- To run the dev environment using makefile you will also need [GNU Make](https://www.gnu.org/software/make/). If you don't have it you can manually run commands from the makefile

### Environment variables

Create an `.env.local` inside the webapp directory

```sh
cd webapp && touch .env.local
```

Now add the following env variables to the file

```env
# CLERK VARIABLES
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY={Your publishable key}
CLERK_SECRET_KEY={Your secret key}
```

### Steps

1. **Clone the repository:**
   ```sh
   git clone https://github.com/neilchetna/planner-webapp.git
   cd planner-webapp
   ```
2. **Install dependencies for Next.js frontend:**
   ```sh
   cd webapp
   pnpm install
   ```
3. **Install dependencies for Go backend:**
   ```sh
   cd backend
   go mod tidy
   ```
4. **Start the development server:**
   (from the root directory)
   ```sh
    make dev
   ```

### Additional Steps

To run the components individually

1. **Start the Next.js frontend:**

   ```sh
   make start-next
   ```

2. **Start the Go backend:**
   ```sh
   make start-go
   ```
