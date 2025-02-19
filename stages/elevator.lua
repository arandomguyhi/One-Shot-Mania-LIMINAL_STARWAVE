local bgPath = '../ena/images/bg/'
local uiPath = '../ena/images/ui/'

setProperty('skipCountdown', true)

luaDebugMode = true

function onCreate()
    -- this stage took me more time than i expected....
    makeLuaSprite('elevator', bgPath..'elevator', -55, -25)
    scaleObject('elevator', 1.8, 1.8, false)
    setScrollFactor('elevator', 0.95, 0.95)
    addLuaSprite('elevator')

    makeAnimatedLuaSprite('elevatorDoor', bgPath..'door', 156, 25)
    addAnimationByPrefix('elevatorDoor', 'closed', 'close', 24, false)
    addAnimationByPrefix('elevatorDoor', 'open', 'door0', 24, false)
    addAnimationByPrefix('elevatorDoor', 'close', 'doornt', 24, false)
    playAnim('elevatorDoor', 'closed', true)
    scaleObject('elevatorDoor', 1.675, 0.7*2, false)
    setScrollFactor('elevatorDoor', 0.95, 0.95)
    addLuaSprite('elevatorDoor')
end

function onCreatePost()
    for _, i in pairs({'comboGroup', 'healthBar', 'healthBar.bg', 'iconP1', 'iconP2', 'timeBar', 'timeTxt', 'scoreTxt'}) do
        setProperty(i..'.visible', false)
    end

    makeAnimatedLuaSprite('maskThing', bgPath..'loop', getProperty('dad.x')-20, getProperty('dad.y')+310)
    addAnimationByPrefix('maskThing', 'idle', 'loop', 24, true)
    playAnim('maskThing', 'idle', true)
    addLuaSprite('maskThing')

    makeAnimatedLuaSprite('arrowWindow', uiPath..'arrowWindow')
    addAnimationByPrefix('arrowWindow', 'idle', 'Símbolo 3 instancia 1', 24, true)
    playAnim('arrowWindow', 'idle', true)
    scaleObject('arrowWindow', 0.85, 0.7)
    screenCenter('arrowWindow')
    setProperty('arrowWindow.y', screenHeight - getProperty('arrowWindow.height'))
    setObjectCamera('arrowWindow', 'camHUD')
    addLuaSprite('arrowWindow')

    makeLuaText('winScore', 'SCORE_0')
    setTextFont('winScore', 'gotham.ttf')
    setTextSize('winScore', 24)
    setProperty('winScore.borderSize', 0)
    setProperty('winScore.x', getProperty('arrowWindow.x')+25)
    setProperty('winScore.y', getProperty('arrowWindow.y')+5)
    addLuaText('winScore')
    setObjectOrder('winScore', getObjectOrder('arrowWindow')+1)

    if shadersEnabled then
        initLuaShader('Indexed')
        makeLuaSprite('outline') setSpriteShader('outline', 'Indexed')

        initLuaShader('VHS')
        makeLuaSprite('vhsShader') setSpriteShader('vhsShader', 'VHS')

        initLuaShader('test')
        makeLuaSprite('hudShader') setSpriteShader('hudShader', 'test')

        runHaxeCode([[
            game.camGame.setFilters([new ShaderFilter(game.getLuaObject('outline').shader), new ShaderFilter(game.getLuaObject('vhsShader').shader)]);
            game.camHUD.setFilters([new ShaderFilter(game.getLuaObject('hudShader').shader), new ShaderFilter(game.getLuaObject('outline').shader)]);
        ]])
    end

    for i = 0, 3 do
        setProperty('opponentStrums.members['..i..'].alpha', 0.001)
        scaleObject('playerStrums.members['..i..']', 0.7, 0.7)
        setProperty('playerStrums.members['..i..'].x', 400 + (137 * i))
        setProperty('playerStrums.members['..i..'].y', getProperty('playerStrums.members['..i..'].y')+5)
    end
end

local el = 0
function onUpdatePost(elapsed)
    el = el + elapsed

    setTextString('winScore', 'SCORE_'..score)
    if shadersEnabled then
        setShaderFloat('vhsShader', 'iTime', el)
        setShaderFloat('hudShader', 'iTime', el)
    end
    --setShaderFloat('outline', 'iTime', el)
end

function onEvent(name, value1, value2)
    if name == 'Zoom Mult' then
        -- ig that's it lol
        setProperty('camZoomingMult', value1)
    elseif name == 'Camera Zoom' then
        setProperty('defaultCamZoom', getProperty('defaultCamZoom') + value1)
    elseif name == 'defaultZoom' then
        setProperty('defaultCamZoom', 1.2)
    end
end