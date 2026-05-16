import { useState } from "react";
import { Camera, Upload, CheckCircle, XCircle } from "lucide-react";
import API from "../services/api";

function AICameraSimulation({ zones, fetchZones, setLogs, setCalculation }) {
  const [selectedImage, setSelectedImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [selectedZone, setSelectedZone] = useState("");
  const [detectionStatus, setDetectionStatus] = useState("Waiting for image...");
  const [isDetecting, setIsDetecting] = useState(false);
  const [detected, setDetected] = useState(null);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];

    if (!file) return;

    setSelectedImage(file);
    setPreview(URL.createObjectURL(file));
    setDetectionStatus("Image uploaded. Ready for AI detection.");
    setDetected(null);
  };

  const runAIDetection = async () => {
    if (!selectedImage) {
      alert("Please upload a vehicle image first");
      return;
    }

    if (!selectedZone) {
      alert("Please select a parking zone");
      return;
    }

    setIsDetecting(true);
    setDetectionStatus("AI camera scanning image...");

    setTimeout(async () => {
      try {
        const isVehicleDetected = true;

        if (isVehicleDetected) {
          const res = await API.put(`/parking/${selectedZone}/entry`);

          setDetected(true);
          setDetectionStatus("Vehicle detected successfully");

          setCalculation(`AI Camera Entry Calculation: ${res.data.formula}`);

          const zoneName =
            zones.find((zone) => zone._id === selectedZone)?.zoneName ||
            "selected zone";

          setLogs((prev) => [
            `AI Camera detected vehicle entering ${zoneName}`,
            ...prev.slice(0, 9),
          ]);

          fetchZones();
        } else {
          setDetected(false);
          setDetectionStatus("No vehicle detected");
        }
      } catch (error) {
        alert(error.response?.data?.message || "AI detection failed");
        setDetected(false);
        setDetectionStatus("Detection failed");
      } finally {
        setIsDetecting(false);
      }
    }, 1800);
  };

  return (
    <div className="ai-camera-section">
      <div className="ai-camera-header">
        <Camera size={34} />
        <div>
          <h2>AI Camera Simulation</h2>
          <p>Upload a vehicle image and simulate automatic vehicle detection</p>
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
              <img src={preview} alt="Vehicle preview" />
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
            {isDetecting ? "Scanning..." : "Run AI Detection"}
          </button>

          <div className="detection-status">
            {detected === true && <CheckCircle className="success-icon" />}
            {detected === false && <XCircle className="fail-icon" />}

            <div>
              <h4>Status</h4>
              <p>{detectionStatus}</p>
            </div>
          </div>

          <div className="ai-explanation">
            <h4>How it works</h4>
            <p>
              Camera captures image → AI detects vehicle → backend increments
              vehicle count → dashboard updates automatically.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AICameraSimulation;