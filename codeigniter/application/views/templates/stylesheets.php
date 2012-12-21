<?php foreach ($this->config->item('stylesheets') as $key => $sheet): ?>
	<?php if (!is_array($sheet)): ?>
	<link rel="stylesheet" type="text/css" href="<?php echo STYLESHEETS.$sheet ?>" />
	<?php
	else:
		if ($key == $page):
			foreach ($sheet as $s):
	?>
	<link rel="stylesheet" type="text/css" href="<?php echo STYLESHEETS.$s ?>" />
	<?php
			endforeach;
		endif;
	endif;
	?>
<?php endforeach ?>