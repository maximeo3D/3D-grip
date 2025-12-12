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
        "slot1": "grip_black",
      },
      "sand": {
        "slot1": "grip_sand",
      },
      "kaki": {
        "slot1": "grip_kaki",
      }
    },
    "grip_picatinny": {
      "black": {
        "slot1": "grip_black",
        "slot2": "filament_black"
      },
      "sand": {
        "slot1": "grip_sand",
        "slot2": "filament_sand"
      },
      "kaki": {
        "slot1": "grip_kaki",
        "slot2": "filament_kaki"
      }
    }
  }
};
if (typeof module !== 'undefined' && module.exports) {
  module.exports = assetConfiguration;
} else {
  window.assetConfig = assetConfiguration;
}
