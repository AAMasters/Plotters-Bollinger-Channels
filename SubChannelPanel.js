
function newAAMastersPlottersBollingerChannelsBollingerSubChannelsSubChannelPanel() {

    let thisObject = {
        fitFunction: undefined,
        onEventRaised: onEventRaised,
        container: undefined,
        draw: draw,
        getContainer: getContainer,
        initialize: initialize
    };

    let container = newContainer();
    container.initialize();
    thisObject.container = container;

    container.displacement.containerName = "Sub-Channel";
    container.frame.containerName = "Sub-Channel";

    let currentChannel;
    let panelTabButton

    return thisObject;

    function initialize() {

        thisObject.container.frame.width = UI_PANEL.WIDTH.NORMAL;
        thisObject.container.frame.height = UI_PANEL.HEIGHT.NORMAL;

        thisObject.container.frame.position.x = viewPort.visibleArea.topRight.x - thisObject.container.frame.width * 6;
        thisObject.container.frame.position.y = viewPort.visibleArea.bottomLeft.y - thisObject.container.frame.height;

        panelTabButton = newPanelTabButton()
        panelTabButton.parentContainer = thisObject.container
        panelTabButton.container.frame.parentFrame = thisObject.container.frame
        panelTabButton.fitFunction = thisObject.fitFunction
        panelTabButton.initialize()
    }

    function getContainer(point) {

        let container;

        container = panelTabButton.getContainer(point)
        if (container !== undefined) { return container }

        if (thisObject.container.frame.isThisPointHere(point, true) === true) {

            let checkPoint = {
                x: point.x,
                y: point.y
            }

            checkPoint = thisObject.fitFunction(checkPoint)

            if (point.x === checkPoint.x && point.y === checkPoint.y) {
                return thisObject.container;
            }
        }
    }


    function onEventRaised(lasCurrentChannel) {

        currentChannel = lasCurrentChannel;

    }


    function draw() {

        thisObject.container.frame.draw(false, false, true, thisObject.fitFunction);

        plotCurrentChannelInfo();

        panelTabButton.draw()
    }


    function plotCurrentChannelInfo() {

        const frameBodyHeight = thisObject.container.frame.getBodyHeight();
        const frameTitleHeight = thisObject.container.frame.height - frameBodyHeight;

        const X_AXIS = thisObject.container.frame.width / 2;
        const Y_AXIS = frameTitleHeight + frameBodyHeight / 2;

        if (currentChannel === undefined) { return; }
        if (currentChannel.innerChannel === undefined) { return; }

        let y;

        printLabel('Direction', X_AXIS, frameTitleHeight + frameBodyHeight * 0.05, '1');
        printLabel(currentChannel.innerChannel.direction, X_AXIS, frameTitleHeight + frameBodyHeight * 0.10, '0.50');

        printLabel('Periods', X_AXIS, frameTitleHeight + frameBodyHeight * 0.15, '1');
        printLabel(currentChannel.innerChannel.period, X_AXIS, frameTitleHeight + frameBodyHeight * 0.20, '0.50');

        let fixedValue = '';

        fixedValue = currentChannel.innerChannel.firstMovingAverage;
        if (fixedValue !== undefined) { fixedValue = fixedValue.toFixed(2); } else { fixedValue = ''; }

        printLabel('Initial Moving Average', X_AXIS, frameTitleHeight + frameBodyHeight * 0.25, '1');
        printLabel(fixedValue, X_AXIS, frameTitleHeight + frameBodyHeight * 0.30, '0.50');

        fixedValue = currentChannel.innerChannel.lastMovingAverage;
        if (fixedValue !== undefined) { fixedValue = fixedValue.toFixed(2); } else { fixedValue = ''; }

        printLabel('Final Moving Average', X_AXIS, frameTitleHeight + frameBodyHeight * 0.35, '1');
        printLabel(fixedValue, X_AXIS, frameTitleHeight + frameBodyHeight * 0.40, '0.50');

        printLabel('Slope', X_AXIS, frameTitleHeight + frameBodyHeight * 0.45, '1');
        printLabel(currentChannel.innerChannel.slope, X_AXIS, frameTitleHeight + frameBodyHeight * 0.50, '0.50');

        function printLabel(labelToPrint, x, y, opacity) {

            let labelPoint;
            let fontSize = 10;

            browserCanvasContext.font = fontSize + 'px ' + UI_FONT.SECONDARY;

            let label = '' + labelToPrint;

            let xOffset = label.length / 2 * fontSize * FONT_ASPECT_RATIO;

            labelPoint = {
                x: x - xOffset,
                y: y
            };

            labelPoint = thisObject.container.frame.frameThisPoint(labelPoint);
            labelPoint = thisObject.fitFunction(labelPoint)

            browserCanvasContext.fillStyle = 'rgba(' + UI_COLOR.DARK + ', ' + opacity + ')';
            browserCanvasContext.fillText(label, labelPoint.x, labelPoint.y);

        }

        browserCanvasContext.closePath();
        browserCanvasContext.fill();

    }
}

