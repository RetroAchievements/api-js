// This file is on the .prettierignore list due to issues with the `with` keyword. Once
// the version of Prettier is updated, this file can be removed from the ignore list.
import packageJson from "../package.json" with { type: "json" };

const { version } = packageJson;

process.env.PACKAGE_VERSION = version;
console.log(`ℹ️  Set User-Agent header version variable to ${version}`);
