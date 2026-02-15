import json
import random
import os

def generate_patient(patient_id):
    genders = ["Male", "Female", "Other"]
    symptoms_pool = [
        "Severe chest pain, shortness of breath, sweating",
        "Persistent high fever, cough, body aches",
        "Mild headache, slight nausea, fatigue",
        "Sudden numbness on one side of body, slurred speech",
        "Abdominal pain, bloating, indigestion",
        "Joint pain, swelling, stiffness",
        "Dizziness, blurred vision, palpitations",
        "Skin rash, itching, minor swelling"
    ]
    pre_existing_pool = ["Hypertension", "Diabetes", "Asthma", "None", "Obesity", "Heart Disease", "Thyroid"]
    
    age = random.randint(1, 95)
    gender = random.choice(genders)
    symptoms = random.choice(symptoms_pool)
    bp_sys = random.randint(90, 180)
    bp_dia = random.randint(60, 110)
    hr = random.randint(50, 120)
    temp = round(random.uniform(36.0, 40.5), 1)
    conditions = random.sample(pre_existing_pool, random.randint(0, 2))
    
    return {
        "Patient_ID": f"P-{patient_id:04d}",
        "Age": age,
        "Gender": gender,
        "Symptoms": symptoms,
        "Blood Pressure": f"{bp_sys}/{bp_dia}",
        "Heart Rate": f"{hr} bpm",
        "Temperature": temp,
        "Pre-existing Conditions": ", ".join(conditions) if conditions else "None"
    }

def main():
    data = [generate_patient(i) for i in range(1, 51)]
    
    os.makedirs("data", exist_ok=True)
    with open("data/synthetic_patients.json", "w") as f:
        json.dump(data, f, indent=4)
    
    print(f"Successfully generated {len(data)} patient records in data/synthetic_patients.json")

if __name__ == "__main__":
    main()
