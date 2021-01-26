export default function ImageGalleryItem({item}) {
    const {id, webformatURL} = item;

    return (
        <li key={id} className="ImageGalleryItem">
            <img id={id} src={webformatURL} alt="" className="ImageGalleryItem-image" />
        </li>
    )
}