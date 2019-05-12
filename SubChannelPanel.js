
function newAAMastersPlottersBollingerChannelsBollingerSubChannelsSubChannelPanel() {

    let thisObject = {
        onEventRaised: onEventRaised,
        container: undefined,
        draw: draw,
        getContainer: getContainer,
        initialize: initialize
    };

    let container = newContainer();
    container.initialize();
    thisObject.container = container;

    container.displacement.containerName = "Current Sub-Channel Panel";
    container.frame.containerName = "Current Sub-Channel Panel";

    let currentChannel;

    return thisObject;

    function initialize() {

        thisObject.container.frame.width = UI_PANEL.WIDTH.NORMAL;
        thisObject.container.frame.height = UI_PANEL.HEIGHT.NORMAL;

        thisObject.container.frame.position.x = viewPort.visibleArea.topRight.x - thisObject.container.frame.width * 6;
        thisObject.container.frame.position.y = viewPort.visibleArea.bottomLeft.y - thisObject.container.frame.height;

    }

    function getContainer(point) {

        let container;

        /* First we check if this point is inside this space. */

        if (this.container.frame.isThisPointHere(point, true) === true) {

            return this.container;

        } else {

            /* This point does not belong to this space. */

            return undefined;
        }

    }


    function onEventRaised(lasCurrentChannel) {

        currentChannel = lasCurrentChannel;

    }


    function draw() {

        this.container.frame.draw(false, false, true);

        plotCurrentChannelInfo();

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

            browserCanvasContext.fillStyle = 'rgba(' + UI_COLOR.DARK + ', ' + opacity + ')';
            browserCanvasContext.fillText(label, labelPoint.x, labelPoint.y);

        }

        browserCanvasContext.closePath();
        browserCanvasContext.fill();

    }
}

