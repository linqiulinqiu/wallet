default: dev

DEST=../app.plotbridge.net

dev:
	npm run dev
	rm -rf ${DEST}
	cp -a public ${DEST}

prod:
	npm run prod
	rm -rf ${DEST}
	cp -a public ${DEST}
