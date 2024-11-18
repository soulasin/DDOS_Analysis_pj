import cv2
import numpy as np
from PIL import Image
from io import BytesIO

def deblur_image(input_path, output_path):
    # Load the image
    image = cv2.imread(input_path)

    # Convert the image to grayscale (if needed)
    gray = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)

    # Apply a deblurring filter (such as a Wiener filter)
    # You might need to adjust the parameters for different types of blurring
    deblurred = cv2.fastNlMeansDenoising(gray, None, 30, 7, 21)

    # Convert the image back to BGR format
    deblurred_bgr = cv2.cvtColor(deblurred, cv2.COLOR_GRAY2BGR)

    # Save the deblurred image
    cv2.imwrite(output_path, deblurred_bgr)

# Example usage
input_image_path = 'deblurred_image.jpg'  # Path to the input blurred image
output_image_path = 'deblurred_image.jpg'  # Path to save the deblurred image

deblur_image(input_image_path, output_image_path)
print(f'Deblurred image saved to: {output_image_path}')
