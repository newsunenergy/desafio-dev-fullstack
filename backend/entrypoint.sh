wait_for_db() {
  echo "Aguardando o MySQL ficar operacional..."
  
  while ! nc -z mysql 3306; do
    sleep 1
    echo "MySQL ainda não está pronto. Tentando novamente..."
  done
  echo "MySQL está pronto! Continuando...."
}


wait_for_db


echo "Executando npx prisma db push..."
npx prisma db push --accept-data-loss


echo "Iniciando servidor backend..."
exec "$@"