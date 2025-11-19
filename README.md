# story
```
import cv2
import time
import RPi.GPIO as GPIO
from ultralytics import YOLO
from picamera2 import Picamera2

# -------------------------
# GPIO Setup
# -------------------------
GPIO.setmode(GPIO.BCM)

IN1, IN2 = 17, 27
IN3, IN4 = 22, 23
ENA, ENB = 5, 6

pins = [IN1, IN2, IN3, IN4, ENA, ENB]
for p in pins:
    GPIO.setup(p, GPIO.OUT)

pwmA = GPIO.PWM(ENA, 1000)
pwmB = GPIO.PWM(ENB, 1000)
pwmA.start(60)
pwmB.start(60)

def stop():
    GPIO.output(IN1,0); GPIO.output(IN2,0)
    GPIO.output(IN3,0); GPIO.output(IN4,0)

def forward():
    GPIO.output(IN1,1); GPIO.output(IN2,0)
    GPIO.output(IN3,1); GPIO.output(IN4,0)

def backward():
    GPIO.output(IN1,0); GPIO.output(IN2,1)
    GPIO.output(IN3,0); GPIO.output(IN4,1)

def left():
    GPIO.output(IN1,0); GPIO.output(IN2,1)
    GPIO.output(IN3,1); GPIO.output(IN4,0)

def right():
    GPIO.output(IN1,1); GPIO.output(IN2,0)
    GPIO.output(IN3,0); GPIO.output(IN4,1)

# -------------------------
# Camera + YOLO Setup
# -------------------------
picam2 = Picamera2()
config = picam2.create_preview_configuration()
picam2.configure(config)
picam2.start()
time.sleep(2)

model = YOLO("yolov8n.pt")  # use bottle/paper/garbage class

# -------------------------
# CONFIG
# -------------------------
FRAME_CENTER = 320  # depends on 640px width
BIN_TURN_TIME = 1.5
BIN_DRIVE_TIME = 2.0

# -------------------------
# MAIN LOOP
# -------------------------
try:
    while True:
        frame = picam2.capture_array()
        results = model(frame, verbose=False)[0]

        detected = False
        x_center = None
        width = None

        # Find bottle/paper/trash class
        for box in results.boxes:
            cls = int(box.cls[0])
            if cls in [39, 40, 41]:  # plastic bottle/paper etc
                detected = True
                x1, y1, x2, y2 = box.xyxy[0]
                x_center = int((x1 + x2) // 2)
                width = int(x2 - x1)
                break

        if not detected:
            print("Searching...")
            left()
            time.sleep(0.2)
            continue

        print("Garbage detected!")

        # -------------------------
        # ALIGNMENT LOGIC
        # -------------------------
        if x_center < FRAME_CENTER - 50:
            print("Turning Left")
            left()
            time.sleep(0.1)

        elif x_center > FRAME_CENTER + 50:
            print("Turning Right")
            right()
            time.sleep(0.1)

        else:
            print("Centered -> Moving Forward")
            forward()
            time.sleep(0.15)

        # -------------------------
        # CLOSE ENOUGH TO COLLECT
        # -------------------------
        if width and width > 200:  # object is very close
            print("Collecting Garbage...")
            forward()
            time.sleep(1.2)

            # -------------------------
            # GO TO BIN
            # -------------------------
            print("Going to Dustbin...")
            right()
            time.sleep(BIN_TURN_TIME)

            forward()
            time.sleep(BIN_DRIVE_TIME)

            # Shake to drop garbage
            left(); time.sleep(0.3)
            right(); time.sleep(0.3)

            # Return to search area
            backward(); time.sleep(1)

            stop()
            print("Resuming Search...")
            time.sleep(1)

except KeyboardInterrupt:
    pass

finally:
    stop()
    GPIO.cleanup()

```
