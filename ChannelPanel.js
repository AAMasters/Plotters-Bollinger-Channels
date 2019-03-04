﻿
function newAAMastersPlottersBollingerChannelsBollingerChannelsChannelPanel () {

    var thisObject = {
        onEventRaised: onEventRaised,
        container: undefined,
        draw: draw,
        getContainer: getContainer,
        initialize: initialize
    };

    var container = newContainer();
    container.initialize();
    thisObject.container = container;

    container.displacement.containerName = "Current Channel Panel";
    container.frame.containerName = "Current Channel Panel";

    let currentChannel;

    return thisObject;

    function initialize() {

        thisObject.container.frame.width = UI_PANEL.WIDTH.NORMAL;
        thisObject.container.frame.height = UI_PANEL.HEIGHT.NORMAL;

        thisObject.container.frame.position.x = viewPort.visibleArea.topRight.x - thisObject.container.frame.width * 5;
        thisObject.container.frame.position.y = viewPort.visibleArea.bottomLeft.y - thisObject.container.frame.height;

    }

    function getContainer(point) {

        var container;

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
        printLabel(currentChannel.innerChannel.periodCount, X_AXIS, frameTitleHeight + frameBodyHeight * 0.20, '0.50');

        printLabel('Initial Moving Average', X_AXIS, frameTitleHeight + frameBodyHeight * 0.25, '1');
        printLabel((currentChannel.innerChannel.firstMovingAverage).toFixed(2), X_AXIS, frameTitleHeight + frameBodyHeight * 0.30, '0.50');

        printLabel('Final Moving Average', X_AXIS, frameTitleHeight + frameBodyHeight * 0.35, '1');
        printLabel((currentChannel.innerChannel.lastMovingAverage).toFixed(2), X_AXIS, frameTitleHeight + frameBodyHeight * 0.40, '0.50');

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

