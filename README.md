```
   _/                                        _/_/
_/_/_/_/  _/    _/  _/_/_/      _/_/      _/      _/_/_/
 _/      _/    _/  _/    _/  _/_/_/_/  _/_/_/_/  _/    _/
_/      _/    _/  _/    _/  _/          _/      _/    _/
 _/_/    _/_/_/  _/_/_/      _/_/_/    _/      _/_/_/
            _/  _/                            _/
       _/_/    _/                            _/
```

# [typefp](https://github.com/cursorsdottsx/typefp/)

###### presented by cursorsdottsx

> TypeScript type creation made easier with a functional programming domain-specific language.

TypeScript's type system was always extremely powerful but intimidating.
New users would find themself stuck at the gates of conditional types and struggle to understand how to create their very own types.

**No more, for typefp is here!**

typefp aims to provide a very _familiar_ DSL that is easy to pick up and use.

### usage

typefp is available on NPM and you can install it with either NPM or Yarn:

```
$ npm install typefp --save
```

```
$ yarn add typefp
```

You can also add it globally to use the CLI:

```
$ npm install typefp --global
```

In VSCode, you can also install the [extension](https://marketplace.visualstudio.com/items?itemName=cursorsdottsx.typefp) for DSL support.

#### use it programmatically

```ts
import typefp from "typefp";

// compile a file with an absolute path and get the output
typefp.compile(file: string): string;

// parse a string into an abstract syntax tree
typefp.parse(content: string): ParseData[];

// transform an array of strings into an array of extended identifier objects
typefp.params(input: string[]): ExtendedIdentifier[];
```

#### use it terminally

```
$ typefp --help
Options:
  -h, --help       Displays all options                                [boolean]
  -v, --version    Displays the version number                         [boolean]
  -e, --extension  Extension of files to compile                        [string]
  -d, --directory  Directory to compile                                 [string]
  -s, --silent     Disables console output                             [boolean]
  -o, --out        Output file                                          [string]
  -c, --config     Path to configuration file                           [string]
  -w, --watch      Recompiles input files on change                    [boolean]
```

### syntax

```
# this is a comment
# comments can only be on its own line

# define a type
# if's with optional else's are allowed
def TypeName(Param1)
    if (Param1 is boolean)
        return Param1

# parameters can have type annotations
def TypeName(Param1: Type, Param2)
    if (Param1 is string)
        return [Param1, "string"]
    else
        return [Param2, "any"]

# define an exported type
# nested if-else
exdef ExportedTypeName(Param1: Type, Param2)
    if (Param1 is string)
        if (Param2 is number)
            return [Param1, PropertyKey]
        else
            return [Param2, Param1]
    else
        return [Param2, "any"]
```

### more

-   Look in the [examples](./examples) folder for examples.
-   Contribute to typefp!
-   Find bugs or issues!
-   leave a ⭐️ **pls** 🥺
