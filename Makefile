.PHONY: prerequisites install run lint build clean purge

# This Makefile should provide you with a simple way to get your dev
# environment up and running. It will install all the dependencies
# needed to run the project, and then run the project.
# Currently this is only a pnpm wrapper. In the future we might include some deployment
# specfic commands here. (e.g. for Firebase emulators)

prerequisites:
	echo "Make sure to have node version manager (nvm) installed. We need it to easily \
		switch between node versions (e.g. if other projects of yours use node<20)"

install:
	pnpm i

run:
	pnpm run dev

lint:
	pnpm run lint

build:
	pnpm run build

clean:
	rm -rf dist

purge: clean
	rm -rf .next node_modules

