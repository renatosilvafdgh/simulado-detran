
$header = Get-Content "sql_header.txt" -Raw -Encoding UTF8
$content = Get-Content "formatted_content.txt" -Raw -Encoding UTF8
$footer = Get-Content "sql_footer.txt" -Raw -Encoding UTF8

# Ensure content has a trailing comma if not present in footer logic, 
# but here footer starts with comma, so content just needs to be the string value.
# The formatted_content.txt already includes single quotes around lines? 
# Let's check formatted_content.txt content first to be sure.
# The previous command created formatted_content.txt with quotes and || chr(10) ||.

$final = $header + $content + $footer
$final | Out-File "insert_cnh_post_final.sql" -Encoding UTF8
