#!/usr/bin/python3
# coding: utf-8
import os
import re
import json
# import shutil => if using windows

# Global variables
componentName = ''
searchableComponentName = ''
repositoryName = ''
repositoryUrl = ''

dirPath = './tmp_clone/'


class bcolors:
    HEADER = '\033[95m'
    OKGREEN = '\033[92m'
    WARNING = '\033[93m'
    FAIL = '\033[91m'
    ENDC = '\033[0m'
    BOLD = '\033[1m'
    UNDERLINE = '\033[4m'


def makeSearchableComponentName(componentName):
    return '<' + componentName


def askComponentName():
    global componentName
    global searchableComponentName
    componentName = input("Enter the name of the component : ")
    searchableComponentName = makeSearchableComponentName(componentName)
    print(bcolors.OKGREEN + searchableComponentName + bcolors.ENDC)


def askRepositoryName():
    global repositoryName
    global repositoryUrl
    repositoryName = input("Enter the name of the module(repository) : ")
    with open('repositories.json') as f:
        data = json.load(f)
    repositoryUrl = data[repositoryName]["repository"]
    print(bcolors.OKGREEN + repositoryUrl + bcolors.ENDC)


def createTmpFolder():
    global dirPath
    alreadyExist = os.path.isdir(dirPath)
    if alreadyExist is True:
        print(bcolors.FAIL + 'tmp_clone directory already exists' + bcolors.ENDC)
        os.system('rm -rf tmp_clone')
        # shutil.rmtree('tmp_clone') => if using windows [os.system is faster and we are all linux users for now]
        print(bcolors.OKGREEN + 'tmp_clone deleted successfully' + bcolors.ENDC)
        pass
    else:
        print(bcolors.OKGREEN + 'tmp_clone already cleaned' + bcolors.ENDC)
        pass

    os.mkdir('tmp_clone')
    os.chdir('tmp_clone')
    os.system('git clone ' + repositoryUrl)


def searchAndDisplay():
    folderPath = './' + repositoryName + '/'
    print('Occurences of ' + bcolors.OKGREEN + componentName + bcolors.ENDC + ' in module : ' +
          bcolors.OKGREEN + repositoryName + bcolors.ENDC)
    # Avoid searching in useless folders
    excludeDirs = set([".git", "public"])
    for(path, dirs, files) in os.walk(folderPath, topdown=True):
        # cf: L71
        [dirs.remove(d) for d in list(dirs) if d in excludeDirs]
        for filename in files:
            filepath = os.path.join(path, filename)
            with open(filepath, 'r') as currentfile:
                for num, line in enumerate(currentfile, 1):
                    if searchableComponentName in line:
                        print('Found the component ' + bcolors.OKGREEN + searchableComponentName +
                              bcolors.ENDC + ' at line ' + bcolors.WARNING + 'L: ' + str(num) + ' ' + bcolors.ENDC + line.lstrip() + 'in file ' + bcolors.WARNING + filename + bcolors.ENDC)


def init():
    askComponentName()
    askRepositoryName()
    createTmpFolder()
    searchAndDisplay()


init()
