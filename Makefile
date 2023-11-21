.PHONY: prerequisites install dev lint build test start clean purge

# This Makefile should provide you with a simple way to get your dev
# environment up and running. It will install all the dependencies
# needed to run the project, and then run the project.
# Currently this is only a pnpm wrapper. In the future we might include some deployment
# specific commands here. (e.g. for Firebase emulators)

prerequisites:
	echo "Make sure to have node version manager (nvm) installed. We need it to easily \
		switch between node versions (e.g. if other projects of yours use node<20)"

install:
	npm install -g firebase-tools
	pnpm run preinstall
	pnpm i
	pre-commit install

setup:
	firebase login

	# select: frameworks, firestore, functions, hosting (configure files ...), Storage,
	# Emulators: Authentication Emulator, Functions Emulator, Firestore Emulator,
	# Hosting Emulator, Storage Emulator
	firebase init

dev:
	pnpm run dev

lint:
	pnpm run lint
	pre-commit run --all-files

build:
	pnpm run build

test: lint
	pnpm run test

start:
	pnpm run start

clean:
	rm -rf dist

purge: clean
	rm -rf .next node_modules
