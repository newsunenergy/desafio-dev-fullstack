yarn

if [[ ! -f "backend/.env" ]]; then
    cp backend/.env.example backend/.env
fi

npx -w backend prisma generate
npx -w backend prisma migrate dev
yarn backend:dev
