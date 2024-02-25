import packageJson from "../package.json" assert { type: "json" };

const { version } = packageJson;

process.env.PACKAGE_VERSION = version;
console.log(`ℹ️  Set User-Agent header version variable to ${version}`);
