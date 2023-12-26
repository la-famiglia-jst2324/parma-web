.PHONY: prerequisites install dev lint build test start clean purge

# This Makefile should provide you with a simple way to get your dev
# environment up and running. It will install all the dependencies
# needed to run the project, and then run the project.
# Currently this is only a pnpm wrapper. In the future we might include some deployment
# specific commands here. (e.g. for Firebase emulators)

# --------------------------------------- Setup -------------------------------------- #

.PHONY: prerequisites
prerequisites:
	echo "Make sure to have node version manager (nvm) installed. We need it to easily \
		switch between node versions (e.g. if other projects of yours use node<20)"

.PHONY: install
install:
	npm install -g firebase-tools
	pnpm run preinstall
	pnpm i
	pre-commit install

.PHONY: setup
setup:
	firebase login

	# select: frameworks, firestore, functions, hosting (configure files ...), Storage,
	# Emulators: Authentication Emulator, Functions Emulator, Firestore Emulator,
	# Hosting Emulator, Storage Emulator
	firebase init

# ---------------------------------------- DEV --------------------------------------- #

.PHONY: dev
dev:
	pnpm run dev

.PHONY: lint
lint:
	pnpm run lint
	pre-commit run --all-files

.PHONY: build
build:
	pnpm run build

.PHONY: test
test: lint
	pnpm run test

.PHONY: start
start:
	pnpm run start

# -------------------------------------- Cleanup ------------------------------------- #

.PHONY: clean
clean:
	rm -rf dist

.PHONY: purge
purge: clean
	rm -rf .next node_modules
