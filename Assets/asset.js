const assetConfiguration = {
  models: {
    "part_model": {
      name: "Modèle Part",
      file: "grip.glb",
      format: "bin",
      dataOffset: 66,
      meshes: {
        "grip_mlok": {
          materialSlots: ["slot1", "slot2"],
          tags: ["mlok"]
        },
        "grip_picatinny": {
          materialSlots: ["slot1", "slot2"],
          tags: ["picatinny"]
        }
      }
    }
  },
  materialConfigs: {
    "grip_mlok": {
      "black": {
        "slot1": "red",
        "slot2": "blue"
      },
      "sand": {
        "slot1": "blue",
        "slot2": "green"
      },
      "kaki": {
        "slot1": "green",
        "slot2": "red"
      }
    },
    "grip_picatinny": {
      "black": {
        "slot1": "red",
        "slot2": "blue"
      },
      "sand": {
        "slot1": "blue",
        "slot2": "green"
      },
      "kaki": {
        "slot1": "green",
        "slot2": "red"
      }
    }
  }
};
if (typeof module !== 'undefined' && module.exports) {
  module.exports = assetConfiguration;
} else {
  window.assetConfig = assetConfiguration;
}
