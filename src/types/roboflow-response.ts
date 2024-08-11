export interface RoboflowResponse {
    time: number;
    predicted_classes: string[];
    predictions: {
      [key: string]: {
        confidence: number;
      };
    };
  }
  