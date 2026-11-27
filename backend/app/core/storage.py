import asyncio

from imagekitio import ImageKit

from app.core.config import settings
from app.core.exceptions import StorageError


class ImageKitStorage:
    def __init__(self) -> None:
        self.client = ImageKit(
            private_key=settings.imagekit_private_key,
        )

    async def upload(
        self,
        file: bytes,
        file_name: str,
        folder: str = "/products",
    ) -> tuple[str, str]:
        """
        Uploads file bytes to ImageKit off the main event loop.
        Returns a tuple of (image_url, imagekit_file_id).
        """
        def _upload() -> tuple[str, str]:
            try:
                response = self.client.files.upload(
                    file=file,
                    file_name=file_name,
                    folder=folder,
                )
                if not response.url or not response.file_id:
                    raise StorageError("Upload succeeded but returned missing url or file_id.")
                return response.url, response.file_id
            except Exception as exc:
                raise StorageError(f"Failed to upload image to storage: {exc}") from exc

        return await asyncio.to_thread(_upload)

    async def delete(self, file_id: str) -> None:
        """
        Deletes a file from ImageKit by file_id off the main event loop.
        """
        def _delete() -> None:
            try:
                self.client.files.delete(file_id=file_id)
            except Exception as exc:
                raise StorageError(f"Failed to delete image from storage: {exc}") from exc

        await asyncio.to_thread(_delete)


storage = ImageKitStorage()
