type LeanguageTypes = {
    python: number
    js: number
    ts: number
}

type ColorsTypes = {
    red: number
    blue: number
    green: number
}


abstract class Utils<Payload> {
    abstract vote(key: keyof Payload): void 
    abstract getScore(key: keyof Payload): string
}

class Leanguage implements Utils<LeanguageTypes>{
    private _leaguages: LeanguageTypes = {
        python: 0,
        js: 0,
        ts: 0
    }
    
    vote(key: keyof LeanguageTypes) {
        this._leaguages[key] += 1
    }
    
    getScore(key: keyof LeanguageTypes) {
        return `${key} has ${this._leaguages[key]} votes`
    }
    
}

class Color implements Utils<ColorsTypes>{
    private _colors: ColorsTypes = {
        red: 0,
        blue: 0,
        green: 0
    }
    
    vote(key: keyof ColorsTypes) {
        this._colors[key] += 1
        
    }
    getScore(key: keyof ColorsTypes) {
        return `${key} has ${this._colors[key]} votes`
        
    }
}


type MainType = {
    classColor: Color
    classLeanguage: Leanguage
}

class Main {
    classColor: Color
    classLeanguage: Leanguage

    constructor({classColor, classLeanguage}: MainType){
        this.classColor = classColor;
        this.classLeanguage = classLeanguage;
    }
    
    selectToVote<Select>(selectedClass: keyof MainType, selectValue: keyof Select) {
        switch (selectedClass) {
            case 'classColor': {
                this.classColor.vote(selectValue as keyof ColorsTypes)
                return this.classColor.getScore(selectValue as keyof ColorsTypes)
            }


            case 'classLeanguage': {
                this.classLeanguage.vote(selectValue as keyof LeanguageTypes)
                return this.classLeanguage.getScore(selectValue as keyof LeanguageTypes)
            }
        }
    }
}

const leanguage = new Leanguage()
const color = new Color()
const main = new Main({classColor: color, classLeanguage: leanguage})

console.log(main.selectToVote<ColorsTypes>('classColor', 'red'))
console.log(main.selectToVote<LeanguageTypes>('classLeanguage', 'python'))
console.log(main.selectToVote<ColorsTypes>('classColor', 'green'))