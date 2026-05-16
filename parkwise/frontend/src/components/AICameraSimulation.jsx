import { useRef, useState } from "react";
import { Camera, Upload, CheckCircle, XCircle } from "lucide-react";
import * as cocoSsd from "@tensorflow-models/coco-ssd";
import "@tensorflow/tfjs";
import API from "../services/api";

function AICameraSimulation({ zones, fetchZones, setLogs, setCalculation }) {
  const [selectedImage, setSelectedImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [selectedZone, setSelectedZone] = useState("");
  const [detectionStatus, setDetectionStatus] = useState("Waiting for image...");
  const [isDetecting, setIsDetecting] = useState(false);
  const [detected, setDetected] = useState(null);
  const [predictions, setPredictions] = useState([]);

  const imageRef = useRef(null);

  const vehicleClasses = ["car", "truck", "bus", "motorcycle", "bicycle"];

  const handleImageUpload = (e) => {
    const file = e.target.files[0];

    if (!file) return;

    setSelectedImage(file);
    setPreview(URL.createObjectURL(file));
    setDetectionStatus("Image uploaded. Ready for real AI detection.");
    setDetected(null);
    setPredictions([]);
  };

  const runAIDetection = async () => {
    if (!selectedImage) {
      alert("Please upload an image first");
      return;
    }

    if (!selectedZone) {
      alert("Please select a parking zone");
      return;
    }

    setIsDetecting(true);
    setDetectionStatus("Loading AI model and scanning image...");

    try {
      const model = await cocoSsd.load();

      const results = await model.detect(imageRef.current);

      setPredictions(results);

      const vehicleDetected = results.find(
        (item) =>
          vehicleClasses.includes(item.class) && item.score >= 0.45
      );

      if (vehicleDetected) {
        const res = await API.put(`/parking/${selectedZone}/entry`);

        const zoneName =
          zones.find((zone) => zone._id === selectedZone)?.zoneName ||
          "selected zone";

        setDetected(true);
        setDetectionStatus(
          `Vehicle detected: ${vehicleDetected.class} (${Math.round(
            vehicleDetected.score * 100
          )}% confidence)`
        );

        setCalculation(`Real AI Camera Entry Calculation: ${res.data.formula}`);

        setLogs((prev) => [
          `Real AI detected ${vehicleDetected.class} entering ${zoneName}`,
          ...prev.slice(0, 9),
        ]);

        fetchZones();
      } else {
        setDetected(false);
        setDetectionStatus("No vehicle detected in this image");
      }
    } catch (error) {
      console.log(error);
      setDetected(false);
      setDetectionStatus("AI detection failed");
    } finally {
      setIsDetecting(false);
    }
  };

  return (
    <div className="ai-camera-section">
      <div className="ai-camera-header">
        <Camera size={34} />
        <div>
          <h2>Real AI Camera Detection</h2>
          <p>Upload an image and detect vehicles using TensorFlow.js</p>
        </div>
      </div>

      <div className="ai-camera-grid">
        <div className="upload-box">
          <label className="upload-label">
            <Upload size={32} />
            <span>Upload Vehicle Image</span>
            <input type="file" accept="image/*" onChange={handleImageUpload} />
          </label>

          {preview && (
            <div className="image-preview">
              <img ref={imageRef} src={preview} alt="Vehicle preview" />
            </div>
          )}
        </div>

        <div className="detection-panel">
          <h3>Detection Control</h3>

          <select
            value={selectedZone}
            onChange={(e) => setSelectedZone(e.target.value)}
          >
            <option value="">Select Parking Zone</option>
            {zones.map((zone) => (
              <option key={zone._id} value={zone._id}>
                {zone.zoneName}
              </option>
            ))}
          </select>

          <button onClick={runAIDetection} disabled={isDetecting}>
            {isDetecting ? "Scanning with AI..." : "Run Real AI Detection"}
          </button>

          <div className="detection-status">
            {detected === true && <CheckCircle className="success-icon" />}
            {detected === false && <XCircle className="fail-icon" />}

            <div>
              <h4>Status</h4>
              <p>{detectionStatus}</p>
            </div>
          </div>

          {predictions.length > 0 && (
            <div className="prediction-box">
              <h4>AI Predictions</h4>
              {predictions.map((item, index) => (
                <p key={index}>
                  {item.class} — {Math.round(item.score * 100)}%
                </p>
              ))}
            </div>
          )}

          <div className="ai-explanation">
            <h4>How it works</h4>
            <p>
              Image is passed to TensorFlow.js COCO-SSD model. If a car, bus,
              truck, motorcycle or bicycle is detected, the backend increases
              the parking count automatically.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AICameraSimulation;