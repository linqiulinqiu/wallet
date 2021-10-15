default: dev

dev:
	cd src; make dev; cd ..

prod:
	cd src; make prod; cd ..

run:
	cd app.plotbridge.net; sudo caddy file-server; cd ..


