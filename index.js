function baseCombat(defense, hitpoints, prayer){
    base = 0.25 * (defense + hitpoints + (Math.floor(prayer * 0.6)))
    return base
}

function meleeLevel(attack, strength){
    melee = attack + strength
    return melee
}

function rangedLevel(ranged){
    return ranged * 1.5
}

function magicLevel(magic){
    return magic * 1.5
}

function totalCombatLevel(baseCombat, meleeLevel, rangedLevel,magicLevel){
    highestLevel = 1
    if (meleeLevel > rangedLevel && meleeLevel > magicLevel){
        highestLevel = meleeLevel
    }
    if (rangedLevel > meleeLevel && rangedLevel > magicLevel){
        highestLevel = rangedLevel
    }
    if (magicLevel > rangedLevel && magicLevel > meleeLevel){
        highestLevel = meleeLevel
    }

    return Math.floor((highestLevel * 0.325)+baseCombat)
}

var attack = parseInt(document.getElementById("attack"));
console.log("attack = "+ attack);
var strength = document.getElementById("strength");
var defense = document.getElementById("defense");
var hitpoints = document.getElementById("hitpoints");
var ranged = document.getElementById("ranged");
var magic = document.getElementById("magic");
var prayer = document.getElementById("prayer");

base = baseCombat(defense, hitpoints, prayer);
melee = meleeLevel(attack,strength);
range = rangedLevel(ranged);
mag = magicLevel(magic);
totalCombatLevel(base, melee, range, mag);

document.getElementById("result").innerHTML = totalCombatLevel;