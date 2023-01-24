<script lang="ts">
	import type {
		FaSymbol,
		FlipProp,
		IconDefinition,
		IconParams,
		IconProp,
		PullProp,
		RotateProp,
		SizeProp,
		Styles
	} from '@fortawesome/fontawesome-svg-core';
	import { icon as iconFn } from '@fortawesome/fontawesome-svg-core';
	import { getIconDefinition, iconStore, type IconDefinitions } from './util/icon-store';
	import type { AnimationProp, FaProps } from './shared/models/props.models';
	import { faClassList } from './util/classlist';
	import { faNormalizeIconSpec } from './util/normalize-icon-spec';

	let iconDefinitions: IconDefinitions;

	let iconHtml: string;

	//#region Props

	export let icon: IconProp;
	export let title: string | undefined = undefined;
	export let animation: AnimationProp | undefined = undefined;
	export let mask: IconProp | undefined = undefined;
	export let styles: Styles | undefined = undefined;
	export let flip: FlipProp | undefined = undefined;
	export let size: SizeProp | undefined = undefined;
	export let pull: PullProp | undefined = undefined;
	export let border: boolean | undefined = undefined;
	export let inverse: boolean | undefined = undefined;
	export let symbol: FaSymbol | undefined = undefined;
	export let rotate: RotateProp | undefined = undefined;
	export let fixedWidth: boolean | undefined = undefined;
	export let a11yRole: string = 'img';
	export let classes: string[] | undefined = undefined;

	//#endregion

	iconStore.subscribe((val) => {
		iconDefinitions = val;
	});

	$: {
		const iconDefinition = findIconDefiniton(iconDefinitions, icon);

		if (iconDefinition != null) {
			const params = buildParams();

			renderIcon(iconDefinition, params);
		}
	}

	const findIconDefiniton = (
		iconDefinitions: IconDefinitions,
		i: IconProp | IconDefinition
	): IconDefinition | null => {
		const lookup = faNormalizeIconSpec(i, 'fas');
		if ('icon' in lookup) {
			return lookup;
		}

		const definition = getIconDefinition(iconDefinitions, lookup.prefix, lookup.iconName);

		if (definition != null) {
			return definition;
		}

		return getIconDefinition(iconDefinitions, 'fas', 'exclamation-triangle');
	};

	const buildParams = () => {
		const classOpts: FaProps = {
			flip: flip,
			animation: animation,
			border: border,
			inverse: inverse,
			size: size,
			pull: pull,
			rotate: rotate,
			fixedWidth: fixedWidth
		};

		return {
			title: title,
			classes: [...faClassList(classOpts), ...(classes ? classes : [])],
			// mask: this.mask != null ? this.findIconDefinition(this.mask) : null,
			// styles: this.styles != null ? this.styles : {},
			symbol: symbol,
			attributes: {
				role: a11yRole
			}
		};
	};

	const renderIcon = (definition: IconDefinition, params: IconParams) => {
		const renderedIcon = iconFn(definition, params);
		iconHtml = renderedIcon.html.join('\n');
	};
</script>

<span bind:innerHTML={iconHtml} contenteditable="false" />
