default: dev

DEST=app.plotbridge.net

dev:
	cd xch; npm run dev; cd ..
	cd xcc; npm run dev; cd ..
	rm -rf ${DEST}/xch
	cp -a xch/public ${DEST}/xch
	rm -rf ${DEST}/xcc
	cp -a xcc/public ${DEST}/xcc
	cp index/index.html ${DEST}

prod:
	cd xch; npm run prod; cd ..
	cd xcc; npm run prod; cd ..
	rm -rf ${DEST}/xch
	cp -a xch/public ${DEST}/xch
	rm -rf ${DEST}/xcc
	cp -a xcc/public ${DEST}/xcc
	cp index/index.html ${DEST}
