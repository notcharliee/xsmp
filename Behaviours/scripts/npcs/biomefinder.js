import { world, Location, Entity } from '@minecraft/server'
import { ActionFormData } from '@minecraft/server-ui'
import { getScore } from '../utils'

world.events.entityHit.subscribe(data => {
    if(data.hitBlock != undefined) return

    const player = data.entity
    const entity = data.hitEntity

    if(entity.typeId == 'xsmp:biomefinder') {

        let plainsIcon = 'textures/guiicons/biomes/locked'
        let flowerIcon = 'textures/guiicons/biomes/locked'
        let oakIcon = 'textures/guiicons/biomes/locked'
        let birchIcon = 'textures/guiicons/biomes/locked'
        let spruceIcon = 'textures/guiicons/biomes/locked'
        let darkOakIcon = 'textures/guiicons/biomes/locked'
        let savannaIcon = 'textures/guiicons/biomes/locked'
        let jungleIcon = 'textures/guiicons/biomes/locked'
        let swampIcon = 'textures/guiicons/biomes/locked'
        let desertIcon = 'textures/guiicons/biomes/locked'
        let mountainsIcon = 'textures/guiicons/biomes/locked'
        let badlandsIcon = 'textures/guiicons/biomes/locked'
        let iceSpikesIcon = 'textures/guiicons/biomes/locked'
    
        let plainsStatus = 'Plains\n§65 coins' // 5 coins
        let flowerStatus = 'Flower Forest\n§65 coins' // 10 coins
        let oakStatus = 'Oak Forest\n§65 coins' // 5 coins
        let birchStatus = 'Birch Forest\n§65 coins' // 5 coins
        let spruceStatus = 'Spruce Forest\n§65 coins' // 5 coins
        let darkOakStatus = 'Dark Oak Forest\n§65 coins' // 5 coins
        let savannaStatus = 'Savanna\n§610 coins' // 10 coins
        let jungleStatus = 'Jungle\n§615 coins' // 15 coins
        let swampStatus = 'Swamp\n§615 coins' // 15 coins
        let desertStatus = 'Desert\n§615 coins' // 15 coins
        let mountainsStatus = 'Mountains\n§630 coins' // 30 coins
        let badlandsStatus = 'Badlands\n§650 coins' // 50 coins
        let iceSpikesStatus = 'Ice Spikes\n§675 coins' // 75 coins
    
        player.getTags().forEach(tag => {
            if(tag == 'biome:plains') plainsStatus = 'Plains\n§6Unlocked', plainsIcon = 'textures/guiicons/biomes/plains'
            if(tag == 'biome:flower') flowerStatus = 'Flower Forest\n§6Unlocked', flowerIcon = 'textures/guiicons/biomes/flower'
            if(tag == 'biome:oak') oakStatus = 'Oak Forest\n§6Unlocked', oakIcon = 'textures/guiicons/biomes/oak'
            if(tag == 'biome:birch') birchStatus = 'Birch Forest\n§6Unlocked', birchIcon = 'textures/guiicons/biomes/birch'
            if(tag == 'biome:spruce') spruceStatus = 'Spruce Forest\n§6Unlocked', spruceIcon = 'textures/guiicons/biomes/spruce'
            if(tag == 'biome:darkoak') darkOakStatus = 'Dark Oak Forest\n§6Unlocked', darkOakIcon = 'textures/guiicons/biomes/darkoak'
            if(tag == 'biome:savanna') savannaStatus = 'Savanna\n§6Unlocked', savannaIcon = 'textures/guiicons/biomes/savanna'
            if(tag == 'biome:jungle') jungleStatus = 'Jungle\n§6Unlocked', jungleIcon = 'textures/guiicons/biomes/jungle'
            if(tag == 'biome:swamp') swampStatus = 'Swamp Forest\n§6Unlocked', swampIcon = 'textures/guiicons/biomes/swamp'
            if(tag == 'biome:desert') desertStatus = 'Desert\n§6Unlocked', desertIcon = 'textures/guiicons/biomes/desert'
            if(tag == 'biome:mountains') mountainsStatus = 'Mountains\n§6Unlocked', mountainsIcon = 'textures/guiicons/biomes/mountains'
            if(tag == 'biome:badlands') badlandsStatus = 'Badlands\n§6Unlocked', badlandsIcon = 'textures/guiicons/biomes/badlands'
            if(tag == 'biome:icespikes') iceSpikesStatus = 'Ice Spikes\n§6Unlocked', iceSpikesIcon = 'textures/guiicons/biomes/icespikes'
        })
    
        const gui = new ActionFormData()
        .title('Biome Finder')
        .body('Where would you like to go?')
        .button(plainsStatus, plainsIcon)
        .button(flowerStatus, flowerIcon)
        .button(oakStatus, oakIcon)
        .button(birchStatus, birchIcon)
        .button(spruceStatus, spruceIcon)
        .button(darkOakStatus, darkOakIcon)
        .button(savannaStatus, savannaIcon)
        .button(jungleStatus, jungleIcon)
        .button(swampStatus, swampIcon)
        .button(desertStatus, desertIcon)
        .button(mountainsStatus, mountainsIcon)
        .button(badlandsStatus, badlandsIcon)
        .button(iceSpikesStatus, iceSpikesIcon)

        /**
        * Buy a biome
        * @param {Entity} target The target entity
        * @param {string} item What is being bought
        * @param {string} tag The tag to give the target
        * @param {number} cost How expensive it is
        */
        function buy(target, item, tag, cost) {
            const coinCount = getScore('coin', target, true).valueOf()

            if(coinCount >= cost) {
                if(!target.hasTag(tag)) {
                    target.tell(`§8[§bXSMP§8] §fUnlocked ${item} for ${cost} coins.`)
                    target.addTag(tag)
                    target.playSound('random.orb')
                    target.runCommandAsync(`scoreboard players remove @s coin ${cost}`)
                } 
            } else {
                target.tell(`§8[§bXSMP§8] §fYou cannot afford this! You need ${cost - coinCount} more coins.`)
                target.playSound('note.bass')
            }
        }

        player.playSound('random.pop', {pitch: 0.5})

        gui.show(player).then(result => {
            if(result.selection == 0) if(player.hasTag('biome:plains')) player.teleport(new Location(1597, 149, 1619), world.getDimension('overworld'), 0, 0); else buy(player, 'Plains Biome', 'biome:plains', 5)
            if(result.selection == 1) if(player.hasTag('biome:flower')) player.teleport(new Location(2182, 68, 1558), world.getDimension('overworld'), 0, 0); else buy(player, 'Flower Forest Biome', 'biome:flower', 5)
            if(result.selection == 2) if(player.hasTag('biome:oak')) player.teleport(new Location(-194, 70, 2674), world.getDimension('overworld'), 0, 0); else buy(player, 'Oak Forest Biome', 'biome:oak', 5)
            if(result.selection == 3) if(player.hasTag('biome:birch')) player.teleport(new Location(356, 87, 3360), world.getDimension('overworld'), 0, 0); else buy(player, 'Birch Forest Biome', 'biome:birch', 5)
            if(result.selection == 4) if(player.hasTag('biome:spruce')) player.teleport(new Location(1077, 95, -3703), world.getDimension('overworld'), 0, 0); else buy(player, 'Spruce Forest Biome', 'biome:spruce', 5)
            if(result.selection == 5) if(player.hasTag('biome:darkoak')) player.teleport(new Location(1172, 93, -3243), world.getDimension('overworld'), 0, 0); else buy(player, 'Dark Oak Forest Biome', 'biome:darkoak', 5)
            if(result.selection == 6) if(player.hasTag('biome:savanna')) player.teleport(new Location(-6239, 71, 4827), world.getDimension('overworld'), 0, 0); else buy(player, 'Savanna Biome', 'biome:savanna', 10)
            if(result.selection == 7) if(player.hasTag('biome:jungle')) player.teleport(new Location(3840, 64, -3682), world.getDimension('overworld'), 0, 0); else buy(player, 'Jungle Biome', 'biome:jungle', 15)
            if(result.selection == 8) if(player.hasTag('biome:swamp')) player.teleport(new Location(3078, 64, -221), world.getDimension('overworld'), 0, 0); else buy(player, 'Swamp Biome', 'biome:swamp', 15)
            if(result.selection == 9) if(player.hasTag('biome:desert')) player.teleport(new Location(4520, 81, -1480), world.getDimension('overworld'), 0, 0); else buy(player, 'Desert Biome', 'biome:desert', 15)
            if(result.selection == 10) if(player.hasTag('biome:mountains')) player.teleport(new Location(1031, 173, -4087), world.getDimension('overworld'), 0, 0); else buy(player, 'Mountains Biome', 'biome:mountains', 30)
            if(result.selection == 11) if(player.hasTag('biome:badlands')) player.teleport(new Location(4570, 84, -1288), world.getDimension('overworld'), 0, 0); else buy(player, 'Badlands Biome', 'biome:badlands', 50)
            if(result.selection == 12) if(player.hasTag('biome:icespikes')) player.teleport(new Location(-729, 113, -4758), world.getDimension('overworld'), 0, 0); else buy(player, 'Ice Spikes Biome', 'biome:icespikes', 75)
        });
    }

});