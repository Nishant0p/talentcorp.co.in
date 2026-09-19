<?php
// Fallback dynamic Open Graph generator for social media crawlers (WhatsApp, Facebook, LinkedIn, Twitter, etc.)
$newsId = isset($_GET['id']) ? trim($_GET['id']) : '';

$strapiBase = 'https://backend.tsplgroup.in';
$siteBase = 'https://tsplgroup.in';
$title = 'TSPL News & Events';
$description = 'Explore the latest updates, achievements, and milestones from TSPL Group.';
$image = $siteBase . '/tspl%20main%20logo.png';
$canonicalUrl = $siteBase . '/news-events/' . urlencode($newsId);

if (!empty($newsId)) {
    // Check if ID is numeric or documentId
    $url = is_numeric($newsId)
        ? $strapiBase . '/api/news-events/' . urlencode($newsId) . '?populate=image'
        : $strapiBase . '/api/news-events?filters[documentId][$eq]=' . urlencode($newsId) . '&populate=image';

    $ctx = stream_context_create([
        'http' => [
            'timeout' => 4,
            'header' => "User-Agent: TSPL-Bot/1.0\r\n"
        ]
    ]);

    $response = @file_get_contents($url, false, $ctx);
    if ($response) {
        $json = json_decode($response, true);
        $data = null;
        if (isset($json['data'])) {
            $data = is_array($json['data']) && isset($json['data'][0]) ? $json['data'][0] : $json['data'];
        }

        if ($data) {
            $title = !empty($data['title']) ? $data['title'] : $title;
            if (!empty($data['description'])) {
                $plain = trim(preg_replace('/\s+/', ' ', strip_tags($data['description'])));
                $description = mb_strlen($plain) > 160 ? mb_substr($plain, 0, 157) . '...' : $plain;
            }

            if (!empty($data['image'])) {
                $img = $data['image'];
                $imgUrl = '';
                if (!empty($img['formats']['large']['url'])) {
                    $imgUrl = $img['formats']['large']['url'];
                } elseif (!empty($img['formats']['medium']['url'])) {
                    $imgUrl = $img['formats']['medium']['url'];
                } elseif (!empty($img['url'])) {
                    $imgUrl = $img['url'];
                }

                if (!empty($imgUrl)) {
                    $image = str_starts_with($imgUrl, 'http') ? $imgUrl : $strapiBase . (str_starts_with($imgUrl, '/') ? '' : '/') . $imgUrl;
                }
            }
        }
    }
}
?>
<!doctype html>
<html lang="en">
<head>
    <meta charset="UTF-8" />
    <title><?php echo htmlspecialchars($title); ?> | TSPL Group</title>
    <meta name="description" content="<?php echo htmlspecialchars($description); ?>" />
    
    <!-- Open Graph / Facebook / WhatsApp -->
    <meta property="og:type" content="article" />
    <meta property="og:url" content="<?php echo htmlspecialchars($canonicalUrl); ?>" />
    <meta property="og:title" content="<?php echo htmlspecialchars($title); ?> | TSPL Group" />
    <meta property="og:description" content="<?php echo htmlspecialchars($description); ?>" />
    <meta property="og:image" content="<?php echo htmlspecialchars($image); ?>" />
    <meta property="og:image:secure_url" content="<?php echo htmlspecialchars($image); ?>" />
    <meta property="og:site_name" content="TSPL Group" />
    
    <!-- Twitter -->
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:url" content="<?php echo htmlspecialchars($canonicalUrl); ?>" />
    <meta name="twitter:title" content="<?php echo htmlspecialchars($title); ?> | TSPL Group" />
    <meta name="twitter:description" content="<?php echo htmlspecialchars($description); ?>" />
    <meta name="twitter:image" content="<?php echo htmlspecialchars($image); ?>" />

    <!-- Redirect humans directly to the SPA page -->
    <meta http-equiv="refresh" content="0;url=<?php echo htmlspecialchars($canonicalUrl); ?>" />
    <script>window.location.replace("<?php echo htmlspecialchars($canonicalUrl); ?>");</script>
</head>
<body>
    <p>Redirecting to <a href="<?php echo htmlspecialchars($canonicalUrl); ?>"><?php echo htmlspecialchars($title); ?></a>...</p>
</body>
</html>
