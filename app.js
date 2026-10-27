const $ = (id) => document.getElementById(id);
$("year").textContent = new Date().getFullYear();

function record(action) {
  const staff = $("staff").value;
  const message = $("message");
  message.className = "message";
  if (!staff) {
    message.classList.add("error");
    message.textContent = "Please select your staff profile first.";
    return;
  }
  message.classList.add("success");
  message.textContent = `Demo only: ${action} request prepared for ${staff}. Real face verification, workplace checks, and secure server recording must be connected before this can count as attendance.`;
  const now = new Date();
  const row = document.createElement("div");
  row.className = "activity-row";
  const left = document.createElement("div");
  const name = document.createElement("b");
  name.textContent = staff;
  const time = document.createElement("small");
  time.textContent = now.toLocaleDateString() + " · " + now.toLocaleTimeString([], {hour:"2-digit",minute:"2-digit"});
  left.append(name,time);
  const right = document.createElement("strong");
  right.textContent = action;
  row.append(left,right);
  const activity = $("activity");
  if (activity.querySelector(".empty")) activity.innerHTML = "";
  activity.prepend(row);
}

function checkLocation() {
  const status = $("location-status");
  const message = $("message");
  if (!navigator.geolocation) {
    status.textContent = "GPS is not supported by this browser";
    message.className = "message error";
    message.textContent = "Your browser does not support location access.";
    return;
  }
  status.textContent = "Checking device location…";
  navigator.geolocation.getCurrentPosition(
    (position) => {
      status.textContent = "Location permission granted (not yet checked against workplace)";
      message.className = "message success";
      message.textContent = `Device location received with approximately ${Math.round(position.coords.accuracy)} m accuracy. This starter does not store your coordinates or verify a workplace boundary.`;
    },
    () => {
      status.textContent = "Location permission not granted";
      message.className = "message error";
      message.textContent = "Allow location access in your browser settings and try again. GPS access alone does not prove attendance.";
    },
    {enableHighAccuracy:true, timeout:10000, maximumAge:0}
  );
}
function showAdminNotice() {
  const message = $("message");
  message.className = "message error";
  message.textContent = "Admin login is not connected yet. Before real deployment, we must implement secure authentication and restrict admin-only actions on the server.";
}
function toggleMenu() {
  alert("RodTrack starter preview: navigation and account pages will be added in the next build step.");
}
