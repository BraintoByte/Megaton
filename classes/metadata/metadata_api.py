class MetadataApi:
    def __init__(self):
        pass

    def get_version(self):
        version = "0.0.1"

        return version

    def get_tags_metadata(self):
        tags_metadata = [
            {
                "name": "Card Info",
                "description": "Get Card Info",
            },
            {
                "name": "Health Check",
                "description": "Simple get health check",
            }
        ]

        return tags_metadata
    
    def get_contact(self):
        contact = {
            "name": "Braintobytes",
            "url": "https://braintobytes.com"
        }

        return contact
        
    def get_license_info(self):
        license_info={
            "name": "GNU General Public License v3.0",
            "identifier": "GPL-3.0-only",
            "url": "https://spdx.org/licenses/GPL-3.0-only.html"
        }

        return license_info