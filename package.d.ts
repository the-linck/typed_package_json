/**
 * Encapsulates all types used to describe Configuration JSON files.
 */
declare namespace Package {
    /**
     * A person who has been involved in creating or maintaining this package.
     */
    type Person = string | {
        name: string,
        url?: string,
        email?: string
    }

    /**
     * Dependencies are specified with a simple hash of package name to version
     * range.
     * The version range is a string which has one or more space-separated
     * descriptors.
     * Dependencies can also be identified with a tarball or git URL.
     */
    interface Dependency {
        [package: string] : string
    }

    /**
     * The module path that is resolved when this specifier is imported. Set to
     * `null` to disallow importing this module.
     */
    type PackageExportsEntryPath = string | null;
    /**
     * Used to specify conditional exports, note that Conditional exports are
     * unsupported in older environments, so it's recommended to use the
     * fallback array option if support for those environments is a concern.
     */
    interface PackageExportsEntryObject {
        /**
         * The module path that is resolved when this specifier is imported as
         * a CommonJS module using the `require(...)` function.
         */
        require?: PackageExportsEntryOrFallback,
        /**
         * The module path that is resolved when this specifier is imported as
         * an ECMAScript module using an `import` declaration or the dynamic
         * `import(...)` function.
         */
        import?: PackageExportsEntryOrFallback,
        /**
         * The module path that is resolved when this environment is Node.js.
         */
        node?: PackageExportsEntryOrFallback,
        /**
         * The module path that is resolved when no other export type matches.
         */
        default?: PackageExportsEntryOrFallback,
        /**
         * The module path that is resolved for TypeScript types when this
         * specifier is imported. Should be listed before other conditions.
         */
        types?: PackageExportsEntryOrFallback
    }
    type PackageExportsEntry = PackageExportsEntryPath | PackageExportsEntryObject;
    /**
     * Used to allow fallbacks in case this environment doesn't support the preceding entries.
     */
    type PackageExportsFallback = PackageExportsEntry[];
    type PackageExportsEntryOrFallback = PackageExportsEntry | PackageExportsEntry[];

    /**
     * Used to inform about ways to help fund development of the package.
     */
    interface fundingWay {
        /**
         * URL to a website with details about how to fund the package.
         */
        url: string,
        /**
         * The type of funding or the platform through which funding can be
         * provided, e.g. patreon, opencollective, tidelift or github.
         */
        type?: string
    }



    /**
     * Configuration JSON file in standard NPM/Yarn format. None of the
     * deprecated properties are included.
     */
    interface Json {
        /**
         * The name of the package.
         */
        name: string,
        /**
         * Version must be parseable by node-semver, which is bundled with npm
         * as a dependency.
         */
        version: string,
        /**
         * This helps people discover your package, as it's listed in 'npm
         * search'.
         */
        description?: string,
        /**
         * This helps people discover your package, as it's listed in 'npm
         * search'.
         */
        keywords?: string[],
        /**
         * The url to the project homepage.
         */
        homepage?: string,
        /**
         * The url to your project's issue tracker and / or the email address
         * to which issues should be reported. These are helpful for people who
         * encounter issues with your package.
         */
        bugs?: string|{
            /**
             * The url to your project's issue tracker.
             */
            url: string,
            /**
             * The email address to which issues should be reported.
             */
            email: string
        },
        /**
         * You should specify a license for your package so that people know
         * how they are permitted to use it, and any restrictions you're
         * placing on it.
         */
        license?: string,
        /**
         * Person who has created this package.
         */
        author?: string | Person,
        /**
         * A list of people who contributed to this package.
         */
        contributors?: Person[],
        /**
         * A list of people who maintains this package.
         */
        maintainers?: Person[],
        /**
         * The 'files' field is an array of files to include in your project.
         * If you name a folder in the array, then it will also include the
         * files inside that folder.
         */
        files?: string[],
        /**
         * The main field is a module ID that is the primary entry point to
         * your program.
         */
        main?: string,
        /**
         * The \"exports\" field is used to restrict external access to
         * non-exported module files, also enables a module to import itself
         * using \"name\".
         */
        exports?: PackageExportsEntryPath | {
            [module: string] : PackageExportsEntryOrFallback
        } | PackageExportsEntryObject | PackageExportsFallback,
        bin?: string | object,
        /**
         * When set to \"module\", the type field allows a package to specify
         * all .js files within are ES modules. If the \"type\" field is
         * omitted or set to \"commonjs\", all .js files are treated as
         * CommonJS.
         */
        type?: string,
        /**
         * Set the types property to point to your bundled declaration file.
         */
        types?: string,
        /**
         * Note that the \"typings\" field is synonymous with \"types\", and
         * could be used as well.
         */
        typings?: string,
        /**
         * Contains overrides for the TypeScript version that matches the
         * version range matching the property key.
         */
        typesVersions?: {
            [type: string] : string[]
        },
        /**
         * Specify either a single file or an array of filenames to put in
         * place for the man program to find.
         */
        man?: string | string[],
        directories?: {
            /**
             * If you specify a 'bin' directory, then all the files in that
             * folder will be used as the 'bin' hash.
             */
            bin?: string,
            /**
             * Put markdown files in here. Eventually, these will be displayed
             * nicely, maybe, someday.
             */
            doc?: string,
            /**
             * Put example scripts in here. Someday, it might be exposed in
             * some clever way.
             */
            example?: string,
            /**
             * Tell people where the bulk of your library is. Nothing special
             * is done with the lib folder in any way, but it's useful meta info.
             */
            lib?: string,
            /**
             * A folder that is full of man pages. Sugar to generate a 'man'
             * array by walking the folder.
             */
            man?: string,
            test?: string,
        },
        /**
         * Specify the place where your code lives. This is helpful for people
         * who want to contribute.
         */
        repository?: string | {
            type?: string,
            url?: string,
            directory?: string,
        },
        /**
         * Used to inform about ways to help fund development of the package.
         */
        funding?: string | string[] | fundingWay | fundingWay[],
        /**
         * The 'scripts' member is an object hash of script commands that are
         * run at various times in the lifecycle of your package. The key is
         * the lifecycle event, and the value is the command to run at that
         * point.
         */
        scripts?: {
            /**
             * Run code quality tools, e.g. ESLint, TSLint, etc.
             */
            lint?: string,
            /**
             * Run BEFORE the package is published (Also run on local npm
             * install without any arguments).
             */
            prepublish?: string,
            /**
             * Run both BEFORE the package is packed and published, and on
             * local npm install without any arguments. This is run AFTER
             * prepublish, but BEFORE prepublishOnly.
             */
            prepare?: string,
            /**
             * Run BEFORE the package is prepared and packed, ONLY on npm
             * publish.
             */
            prepublishOnly?: string,
            /**
             * run BEFORE a tarball is packed (on npm pack, npm publish, and
             * when installing git dependencies).
             */
            prepack?: string,
            /**
             * Run AFTER the tarball has been generated and moved to its final
             * destination.
             */
            postpack?: string,
            /**
             * Publishes a package to the registry so that it can be installed
             * by name.
             * @see https://docs.npmjs.com/cli/v8/commands/npm-publish
             */
            publish?: string,
            /**
             * Run AFTER the package is published.
             */
            postpublish?: string,
            /**
             * Run BEFORE the package is installed.
             */
            preinstall?: string,
            /**
             * Run AFTER the package is installed.
             */
            install?: string,
            /**
             * Run AFTER the package is installed.
             */
            postinstall?: string,
            /**
             * Run BEFORE the package is uninstalled.
             */
            preuninstall?: string,
            /**
             * Run BEFORE the package is uninstalled.
             */
            uninstall?: string,
            /**
             * Run AFTER the package is uninstalled.
             */
            postuninstall?: string,
            /**
             * Run BEFORE bump the package version.
             */
            preversion?: string,
            /**
             * Run BEFORE bump the package version.
             */
            version?: string,
            /**
             * Run AFTER bump the package version.
             */
            postversion?: string,
            /**
             * Run by the 'npm test' command.
             */
            pretest?: string,
            /**
             * Run by the 'npm test' command.
             */
            test?: string,
            /**
             * Run by the 'npm test' command.
             */
            posttest?: string,
            /**
             * Run by the 'npm stop' command.
             */
            prestop?: string,
            /**
             * Run by the 'npm stop' command.
             */
            stop?: string,
            /**
             * Run by the 'npm stop' command.
             */
            poststop?: string,
            /**
             * Run by the 'npm start' command.
             */
            prestart?: string,
            /**
             * Run by the 'npm start' command.
             */
            start?: string,
            /**
             * Run by the 'npm start' command.
             */
            poststart?: string,
            /**
             * Run by the 'npm restart' command.
             * Note: 'npm restart' will run the stop and start scripts if no
             * restart script is provided.
             */
            prerestart?: string,
            /**
             * Run by the 'npm restart' command.
             * Note: 'npm restart' will run the stop and start scripts if no
             * restart script is provided.
             */
            restart?: string,
            /**
             * Run by the 'npm restart' command.
             * Note: 'npm restart' will run the stop and start scripts if no
             * restart script is provided.
             */
            postrestart?: string,
            /**
             * Start dev server to serve application files.
             */
            serve?: string,
            [name: string] : string | undefined
        },
        /**
         * A 'config' hash can be used to set configuration parameters used in
         * package scripts that persist across upgrades.
         */
        config?: object,
        dependencies?: Dependency,
        devDependencies?: Dependency,
        optionalDependencies?: Dependency,
        peerDependencies?: Dependency,
        /**
         * When a user installs your package, warnings are emitted if packages
         * specified in \"peerDependencies\" are not already installed. The
         * \"peerDependenciesMeta\" field serves to provide more information on
         * how your peer dependencies are utilized. Most commonly, it allows
         * peer dependencies to be marked as optional. Metadata for this field
         * is specified with a simple hash of the package name to a metadata
         * object.
         */
        peerDependenciesMeta?: {
            [name: string] : {
                /**
                 * Specifies that this peer dependency is optional and should
                 * not be installed automatically.
                 */
                optional: boolean,
                [property: string] : string | boolean | undefined
            }
        },
        /**
         * Array of package names that will be bundled when publishing the
         * package.
         */
        bundledDependencies?: boolean | string[],
        /**
         * Resolutions is used to support selective version resolutions using
         * yarn, which lets you define custom package versions or ranges inside
         * your dependencies. For npm, use overrides instead.
         * 
         * @see https://classic.yarnpkg.com/en/docs/selective-version-resolutions
         */
        resolutions?: object,
        /**
         * Overrides is used to support selective version overrides using npm,
         * which lets you define custom package versions or ranges inside your
         * dependencies. For yarn, use resolutions instead.
         * 
         * @see https://docs.npmjs.com/cli/v9/configuring-npm/package-json#overrides
         */
        overrides?: object,
        /**
         * Defines which package manager is expected to be used when working on
         * the current project. This field is currently experimental and needs
         * to be opted-in.
         * 
         * @see https://nodejs.org/api/corepack.html
         */
        packageManager?: string,
        engines?: {
            node: string,
            [name: string] : string
        },
        engineStrict?: boolean,
        /**
         * Specify which operating systems your module will run on.
         */
        os?: string[],
        /**
         * Specify that your code only runs on certain cpu architectures.
         */
        cpu?: string[],
        /**
         * If set to true, then npm will refuse to publish it.
         */
        private?: boolean | string,
        publishConfig?: {
            access?: string,
            tag?: string,
            registry?: string,
            [name: string] : string | undefined
        },
        dist?: {
            shasum?: string,
            tarball?: string,
        },
        readme?: string,
        /**
         * An ECMAScript module ID that is the primary entry point to your
         * program.
         */
        module?: string,
        /**
         * A module ID with untranspiled code that is the primary entry point
         * to your program.
         */
        esnext?: string | {
            main?: string,
            browser?: string,
            [name: string] : string | undefined
        },
        /**
         * Allows packages within a directory to depend on one another using
         * direct linking of local files. Additionally, dependencies within a
         * workspace are hoisted to the workspace root when possible to reduce
         * duplication. Note: It's also a good idea to set \"private\" to true
         * when using this feature.
         */
        workspaces?: string[] | {
            /**
             * Workspace package paths. Glob patterns are supported.
             */
            packages?: string[],
            /**
             * Packages to block from hoisting to the workspace root
             */
            nohoist?: string[],
        },
        jspm?: any,
        /**
         * @see https://json.schemastore.org/eslintrc.json
         */
        eslintConfig?: object,
        /**
         * @see https://json.schemastore.org/prettierrc.json
         */
        prettier?: object,
        /**
         * @see https://json.schemastore.org/stylelintrc.json
         */
        stylelint?: object,
        /**
         * @see https://json.schemastore.org/ava.json
         */
        ava?: object,
        /**
         * @see https://json.schemastore.org/semantic-release.json
         */
        release?: object,
        /**
         * @see https://json.schemastore.org/jscpd.json
         */
        jscpd?: object,
    }
}