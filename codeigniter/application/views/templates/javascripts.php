<?php foreach ($this->config->item('javascripts') as $key => $script): ?>
	<?php if (!is_array($script)): ?>
	<script type="text/javascript" src="<?php echo JAVASCRIPTS.$script ?>"></script>
	<?php
	else:
		if ($key == $page):
			foreach ($script as $s):
	?>
	<script type="text/javascript" src="<?php echo JAVASCRIPTS.$s ?>"></script>
	<?php
			endforeach;
		endif;
	endif;
	?>
<?php endforeach ?>