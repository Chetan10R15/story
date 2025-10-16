# story
```
import cv2
from ultralytics import YOLO
from picamera2 import Picamera2
import time
import os

# Initialize and configure the camera
picam2 = Picamera2()
config = picam2.create_preview_configuration()
picam2.configure(config)
picam2.start()
time.sleep(2)  # allow camera to warm up

# Load YOLOv8 model
model = YOLO("yolov8n.pt")

# Create folder to save detections
save_path = "detections"
os.makedirs(save_path, exist_ok=True)

# Variables for FPS calculation
prev_time = 0

# Real-time detection loop
while True:
    # Capture a frame
    frame = picam2.capture_array()

    # Run YOLO inference
    results = model(frame, stream=True)

    for r in results:
        annotated_frame = r.plot()

        # =======================
        # FPS Calculation
        # =======================
        curr_time = time.time()
        fps = 1 / (curr_time - prev_time) if prev_time != 0 else 0
        prev_time = curr_time
        cv2.putText(
            annotated_frame, f"FPS: {fps:.2f}", (20, 40),
            cv2.FONT_HERSHEY_SIMPLEX, 1, (0, 255, 0), 2
        )

        # =======================
        # Save frame if person detected
        # =======================
        for box in r.boxes:
            cls_id = int(box.cls[0])  # class id
            if model.names[cls_id] == "person":
                filename = os.path.join(save_path, f"person_{int(time.time())}.jpg")
                cv2.imwrite(filename, frame)
                print(f"[INFO] Saved detection: {filename}")

        # Display the frame
        cv2.imshow("Live Detection", annotated_frame)

    # Exit on pressing 'q'
    if cv2.waitKey(1) & 0xFF == ord('q'):
        break

# Cleanup
cv2.destroyAllWindows()
picam2.stop()
```
