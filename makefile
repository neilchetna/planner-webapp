.PHONEY: dev

# [BACKEND]
start-db:
	docker-compose up -d 

start-go:
	cd backend && air | sed 's/^/[GO] /'

# [WEBAPP]
start-next:
	cd webapp && npm run dev 2>&1 | sed 's/^/[NEXT] /'

dev: start-db
	@$(MAKE) -j2 start-go start-next