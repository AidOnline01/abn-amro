# Installation
1. Install docker https://docs.docker.com/get-docker/ (If you use windows, note that you will need to enable WSL2 https://docs.docker.com/desktop/windows/wsl/)
2. Clone repo `git clone https://github.com/AidOnline01/abn-amro.git ./abn-amro`
3. Enter root directory of the application `cd abn-amro`
4. Build containers `docker-compose build --no-cache`
5. Run containers `docker-compose up -d --force-recreate`
6. Enter docker console `docker exec -it abn_movies_app /bin/bash`
7. Run Webpack Dev Server `npm run dev`
8. Access website by url `http://localhost:8080` 

# Notice

## Open api problem
Unfortunatelly the provided open API (http://www.tvmaze.com/api) does not support filtering by rating or genres. There is still open issue (https://www.tvmaze.com/threads/1115/list-of-popular-shows) regarding this problem.

If we have been using that API for our own services, realistic solution would be to import the movies list to our database, implement daily/weekly sync, and then sort movies using our own database. That's also recommened solution by API author.

For this test project, because of this issue, I would be just retrieving first 250 movies from the api and then sort those movies manually using vuex getters.

<br>


# Explanation for architecture decisions

## Docker
Docker is used to ensure that all the team member will be able to quickly setup project locally, and to be confident that we have the same environment and packages.

## Webpack
Webpack is used to bundle the project, proccess and optimize assests, compile Typescript and Vue to javascript consumed by browser.

## Typescript
Typescript is used to prevent typing error, and enforce better self-documenting code.

## Eslint
Eslint is used to enforce same code style across the project.

## Vuex
Vuex is used for shared state and data management across the application. 

To provide better structure and architecture to the app data. 

And to persist some state for page reload. 

**vuex-module-decorators** are used for ensuring typesafety of modules state, mutations, and actions. 