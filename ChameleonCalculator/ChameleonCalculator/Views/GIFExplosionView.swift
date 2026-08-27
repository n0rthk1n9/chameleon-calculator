import SwiftUI
import ImageIO
import UIKit

/// Plays an animated GIF full-screen via `UIImageView`. Used for the original
/// explosion easter egg, decoded from a data asset in the asset catalog.
struct GIFExplosionView: UIViewRepresentable {
    let assetName: String

    func makeUIView(context: Context) -> UIImageView {
        let imageView = UIImageView()
        imageView.contentMode = .scaleAspectFill
        imageView.clipsToBounds = true
        imageView.backgroundColor = .black

        if let data = NSDataAsset(name: assetName)?.data,
           let animation = Self.decode(data) {
            imageView.animationImages = animation.frames
            imageView.animationDuration = animation.duration
            imageView.animationRepeatCount = 0
            imageView.image = animation.frames.first
            imageView.startAnimating()
        }
        return imageView
    }

    func updateUIView(_ uiView: UIImageView, context: Context) {}

    /// Decode every GIF frame plus its total playback duration using ImageIO.
    private static func decode(_ data: Data) -> (frames: [UIImage], duration: Double)? {
        guard let source = CGImageSourceCreateWithData(data as CFData, nil) else { return nil }
        let count = CGImageSourceGetCount(source)
        guard count > 0 else { return nil }

        var frames: [UIImage] = []
        var duration = 0.0
        for index in 0..<count {
            guard let cgImage = CGImageSourceCreateImageAtIndex(source, index, nil) else { continue }
            frames.append(UIImage(cgImage: cgImage))
            duration += frameDelay(source, index)
        }
        return frames.isEmpty ? nil : (frames, duration)
    }

    private static func frameDelay(_ source: CGImageSource, _ index: Int) -> Double {
        let fallback = 1.0 / 30.0
        guard let properties = CGImageSourceCopyPropertiesAtIndex(source, index, nil) as? [CFString: Any],
              let gif = properties[kCGImagePropertyGIFDictionary] as? [CFString: Any] else {
            return fallback
        }
        let delay = (gif[kCGImagePropertyGIFUnclampedDelayTime] as? Double)
            ?? (gif[kCGImagePropertyGIFDelayTime] as? Double)
            ?? fallback
        // Match browser behavior: treat near-zero delays as 0.1s.
        return delay < 0.011 ? 0.1 : delay
    }
}
