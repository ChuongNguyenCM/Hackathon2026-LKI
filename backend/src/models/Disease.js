import mongoose from "mongoose";

const { Schema } = mongoose;

// Sub-schemas (embedded)
const SymptomProfileSchema = new Schema(
    {
        symptomId: { type: String, required: true, trim: true }, // e.g. "sym_red_eye"
        weight: { type: Number, required: true, min: 0, max: 1 },
        typical: { type: Boolean, default: false },
    },
    { _id: false }
);

const RedFlagSchema = new Schema(
    {
        symptomId: { type: String, required: true, trim: true }, // e.g. "sym_severe_eye_pain"
        reason: { type: String, required: true, trim: true },
    },
    { _id: false }
);

const SectionsSchema = new Schema(
    {
        whatIsIt: { type: String, required: true, trim: true },
        commonSymptomsText: { type: String, required: true, trim: true },
        causes: { type: String, required: true, trim: true },
        riskFactorsText: { type: String, required: true, trim: true },
        diagnosis: { type: String, required: true, trim: true },
        treatment: { type: String, required: true, trim: true },
        selfCare: { type: String, required: true, trim: true },
        whenToSeeDoctor: { type: String, required: true, trim: true },
    },
    { _id: false }
);

const DiscriminatorsSchema = new Schema(
    {
        onset: {
            type: String,
            required: true,
            enum: ["sudden", "gradual", "variable"],
        },
        laterality: {
            type: String,
            required: true,
            enum: ["one_eye", "both_eyes", "either"],
        },
        painLevel: { type: Number, required: true, min: 0, max: 3 },
        visionImpact: {
            type: String,
            required: true,
            enum: ["none", "mild", "significant"],
        },
        photophobiaCommon: { type: Boolean, default: false },
        dischargeType: {
            type: String,
            required: true,
            enum: ["none", "watery", "mucopurulent"],
        },
        itchingCommon: { type: Boolean, default: false },
        contactLensRisk: { type: Boolean, default: false },
    },
    { _id: false }
);

// Main schema
const DiseaseSchema = new Schema(
    {
        // You are using a string _id like "dis_bacterial_conjunctivitis"
        _id: { type: String, required: true, trim: true },

        name: { type: String, required: true, trim: true },
        thumbnailUrl: { type: String, required: true, trim: true },

        shortDescription: { type: String, required: true, trim: true },

        categoryTags: {
            type: [String],
            default: [],
            validate: {
                validator: (arr) => Array.isArray(arr) && arr.every((x) => typeof x === "string"),
                message: "categoryTags must be an array of strings",
            },
        },

        urgencyBadge: {
            type: String,
            required: true,
            enum: ["low", "low_to_medium", "medium", "medium_to_high", "high", "emergency"],
        },

        sections: { type: SectionsSchema, required: true },

        symptomProfile: {
            type: [SymptomProfileSchema],
            default: [],
            validate: {
                validator: (arr) => Array.isArray(arr) && arr.length > 0,
                message: "symptomProfile must have at least 1 item",
            },
        },

        redFlags: { type: [RedFlagSchema], default: [] },

        discriminators: { type: DiscriminatorsSchema, required: true },

        aiSearchText: { type: String, required: true, trim: true },

        // Keep as Date in DB (recommended). You can still send ISO strings from API.
        updatedAt: { type: Date, default: Date.now },
    },
    {
        // Adds createdAt + updatedAt (mongoose-managed)
        timestamps: true,
        versionKey: false,
    }
);

// Useful indexes for filtering/search
DiseaseSchema.index({ name: "text", shortDescription: "text" });
DiseaseSchema.index({ categoryTags: 1 });
DiseaseSchema.index({ "symptomProfile.symptomId": 1 });
DiseaseSchema.index({ urgencyBadge: 1 });

const Disease = mongoose.model("Disease", DiseaseSchema);

export default Disease;