#   this template injector expects to be executed in the same directory as the
#   templates that need to be HTMLified
import os, sys

injections = {}

print('Attempting to read in injections')
for f in os.listdir("./"):
    if f.endswith(".inj"):
        with open(f) as file:
            fileStr = file.read()
            injections[f.split('.')[0]] = fileStr
            print('Added {{' + f.split('.')[0] + '}} to injections list')

print('Attempting to inject into templates')
for f in os.listdir("./"):
    if f.endswith(".template"):
        print('Injecting templates into ' + f)
        with open(f) as file:
            fileStr = file.read()
            # for each injection, find template locators with this injection
            # name and write them over with the injection
            for key in injections:
                bracketedKey = '{{' + key + '}}'
                fileStr = fileStr.replace(bracketedKey, injections[key])
            outputFileName = "../" + f.split('.')[0] + '.html'
            with open(outputFileName, "w") as outFile:
                outFile.write(fileStr)
        print()

print('done')
