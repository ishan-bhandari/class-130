function setup() {

    canvas = createCanvas(600, 500);
    canvas.center();

    video = createCapture(VIDEO);
    video.hide();
    poseNet = ml5.poseNet(video, modelloaded);
    poseNet.on('pose', gotPoses);

}

function modelloaded() {
    console.log('poseNet is inniselised');

}
scoreleftWristY = 0;
scorerightWristY = 0;

function gotPoses(results) {
    if (results.length > 0) {
        console.log(results);
        scoreleftWristY = results[0].pose.keypoints[9].score;
        scorerightWristY = results[0].pose.keypoints[10].score;
        console.log("scortLeftWrist =" + scoreleftWristY);


        rightwristX = results[0].pose.rightWrist.x;
        rightwristY = results[0].pose.rightWrist.y;
        console.log("rightWristX = " + rightwristX + " and rightWristY = " + rightwristY);
        leftwristX = results[0].pose.leftWrist.x;
        leftwristY = results[0].pose.leftWrist.y;
        console.log("leftWristX = " + leftwristX + " and leftWristY = " + leftwristY);
    }
}

function draw() {
    image(video, 0, 0, 600, 500);
    fill("#FF0000");
    stroke("#FF0000");
    if (scorerightWristY > 0.2) {
        circle(rightwristX, rightwristY, 20);
        if (rightwristY > 0 && rightwristY <= 100) {
            document.getElementById("speed").innerHTML = "speed=0.5x";
            song.rate(0.5);

        } else if (rightwristY > 100 && rightwristY <= 200) {
            document.getElementById("speed").innerHTML = "speed=1x";
            song.rate(1);

        } else if (rightwristY > 200 && rightwristY <= 300) {
            document.getElementById("speed").innerHTML = "speed=1.5x";
            song.rate(1.5);

        } else if (rightwristY > 300 && rightwristY <= 400) {
            document.getElementById("speed").innerHTML = "speed=2x";
            song.rate(2);

        } else if (rightwristY > 400 && rightwristY <= 500) {
            document.getElementById("speed").innerHTML = "speed=2.5x";
            song.rate(2.5);

        }

    }
    if (scoreleftWristY > 0.2) {

        circle(leftwristX, leftwristY, 20);
        InNumberleftWristY = Number(leftwristY);
        remove_decimals = floor(InNumberleftWristY);
        volume = remove_decimals / 500;
        document.getElementById("volume").innerHTML = "Volume =" + volume;
        song.setVolume(volume);
    }
}
song = "";
rightwristX = 0;
rightwristY = 0;
leftwristX = 0;
leftwristY = 0;


function preload() {
    song = loadSound("music.mp3")
}

function play() {
    song.play();
    song.setVolume(1);
    song.rate(1);

}