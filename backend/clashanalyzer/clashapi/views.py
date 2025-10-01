# clashapi/views.py
import requests
from django.http import HttpResponse, JsonResponse
from django.conf import settings
from django.views.decorators.http import require_GET

SUPER_API_BASE = "https://api.clashroyale.com/v1"

def _supercell_get(path):
    key = getattr(settings, "CLASH_ROYALE_KEY", "")
    if not key:
        raise RuntimeError("CLASH_ROYALE_KEY not configured in settings or .env")
    url = f"{SUPER_API_BASE}{path}"
    headers = {
        "Authorization": f"Bearer {key}",
        "Accept": "application/json"
    }
    # short timeout to avoid long hangs
    return requests.get(url, headers=headers, timeout=10)

@require_GET
def player_detail(request, tag):
    tag_clean = tag.lstrip('#')
    try:
        r = _supercell_get(f"/players/%23{tag_clean}")
    except Exception as e:
        return JsonResponse({"error": "upstream request failed", "detail": str(e)}, status=502)

    # forward response bytes with status and content-type
    resp = HttpResponse(r.content, status=r.status_code, content_type="application/json")

    # forward rate-limit headers if present (helpful for debugging and throttling)
    for header in ("x-ratelimit-limit", "x-ratelimit-remaining", "retry-after", "x-ratelimit-reset"):
        if header in r.headers:
            resp[header] = r.headers[header]
    return resp

@require_GET
def player_battlelog(request, tag):
    tag_clean = tag.lstrip('#')
    try:
        r = _supercell_get(f"/players/%23{tag_clean}/battlelog")
    except Exception as e:
        return JsonResponse({"error": "upstream request failed", "detail": str(e)}, status=502)

    resp = HttpResponse(r.content, status=r.status_code, content_type="application/json")
    for header in ("x-ratelimit-limit", "x-ratelimit-remaining", "retry-after", "x-ratelimit-reset"):
        if header in r.headers:
            resp[header] = r.headers[header]
    return resp
