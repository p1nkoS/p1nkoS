#!/usr/bin/env bash
# Viknar'off Vinnytsia — one-command launcher
# Usage:  ./start.sh           # build + start in background
#         ./start.sh stop      # stop everything
#         ./start.sh logs      # tail logs

set -e
cd "$(dirname "$0")"

case "${1:-up}" in
  stop|down)
    docker compose down
    ;;
  logs)
    docker compose logs -f --tail=100
    ;;
  *)
    if ! command -v docker >/dev/null 2>&1; then
      echo "❌ Docker не знайдено. Встанови Docker Desktop: https://docs.docker.com/get-docker/"
      exit 1
    fi
    echo "🚀 Запускаю Viknar'off Vinnytsia..."
    docker compose up -d --build
    echo ""
    echo "✅ Готово!"
    echo "   🌐 Сайт:   http://localhost:3000"
    echo "   ⚙️  API:    http://localhost:8001/api/"
    echo "   🗄️  Mongo:  mongodb://localhost:27017"
    echo ""
    echo "   Зупинити: ./start.sh stop"
    echo "   Логи:     ./start.sh logs"
    ;;
esac
