page-loader:
		node bin/page-loader.js -o D:\temp\ https://www.ya.ru

install:
		npm ci

lint:
		npx eslint .

test:
		npx jest

publish:
		npm publish --dry-run && npm link

test-coverage:
		npm test -- --coverage --coverageProvider=v8
