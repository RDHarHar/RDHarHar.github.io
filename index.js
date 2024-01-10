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

